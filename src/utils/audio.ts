export class TimerAudio {
  private static instance: TimerAudio;
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private stopTimeout: number | null = null;

  private constructor() {
    this.audioContext = new (window.AudioContext || window.AudioContext)();
  }

  static getInstance(): TimerAudio {
    if (!TimerAudio.instance) {
      TimerAudio.instance = new TimerAudio();
    }
    return TimerAudio.instance;
  }

  private async initializeAudioContext(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    // Always resume the AudioContext if it's suspended
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
  }

  resumeAudioContext() {
    if (this.audioContext!.state === "suspended") {
      this.audioContext!.resume();
    }
  }

  async play(durationMs: number): Promise<void> {
    // validate if the audio is playing
    if (this.isPlaying) {
      return;
    }

    try {
      await this.initializeAudioContext();

      if (!this.audioContext) {
        throw new Error("AudioContext not initialized");
      }

      // Create and configure oscillator
      this.oscillator = this.audioContext.createOscillator();
      this.gainNode = this.audioContext.createGain();

      this.oscillator.type = "sine";
      this.oscillator.frequency.setValueAtTime(
        880,
        this.audioContext.currentTime // A5 note
      );

      // Configure gain (volume) envelope
      this.gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);

      // Connect nodes
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);

      // Start and stop the oscillator
      this.oscillator.start();
      this.isPlaying = true;

      this.stopTimeout = setTimeout(() => this.stop(), durationMs);
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  }

  stop(): void {
    if (!this.isPlaying) {
      return;
    }

    if (this.oscillator) {
      try {
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch (error) {
        console.log(error);
      }
      this.oscillator = null;
    }

    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }

    this.isPlaying = false;

    if (this.stopTimeout) {
      clearTimeout(this.stopTimeout);
      this.stopTimeout = null;
    }
  }
}
