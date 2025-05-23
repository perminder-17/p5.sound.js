/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Meter as ToneMeter } from "tone/build/esm/component/analysis/Meter.js";
import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";

/**
 * Get the current volume of a sound.
 * @class Amplitude
 * @constructor
 * @param {Number} [smoothing] Smooth the amplitude analysis by averaging with the last analysis frame. 0.0 is no time averaging with the last analysis frame.
 * @example
 * <div>
 * <code>
 * let sound, amp, cnv;
 *   
 * function preload() {
 *   //replace this sound with something local with rights to distribute
 *   sound = loadSound('/assets/Damscray_DancingTiger.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 *   textAlign(CENTER);
 *   fill(255);
 *   amp = new p5.Amplitude();
 *   sound.connect(amp);
 * }
 * 
 * function playSound() {
 *   sound.play();
 * }
 * 
 * function draw() {
 *   let level = amp.getLevel();
 *   level = map(level, 0, 0.2, 0, 255);
 *   background(level, 0, 0);
 *   text('tap to play', width/2, 20);
 *   describe('The color of the background changes based on the amplitude of the sound.');
 * }
 * </code>
 * </div>
 */
class Amplitude {
  constructor(smoothing = 0) {
    this.amplitude = new ToneMeter({normalRange:true, smoothing:smoothing});
  }

  /**
   * Connect an audio source to the amplitude object.
   * @method setInput
   * @for Amplitude
   * @param {Object} input - An object that has audio output.
   */
  setInput(input) {
    input.getNode().connect(this.amplitude);
  }

  getLevel() {
    return this.amplitude.getValue();
  }

  /**
   * Get the current amplitude value of a sound.
   * @method smooth
   * @for Amplitude
   * @param {Number} Smooth Amplitude analysis by averaging with the last analysis frame. Off by default.
   */
  smooth(s) {
    this.amplitude.smoothing = s;
  }

  connect(destination) {
    if(typeof destination.getNode === 'function') {
      this.amplitude.connect(destination.getNode());
    } else {
      this.amplitude.connect(destination);
    }
  }

  disconnect() {
    this.amplitude.disconnect(ToneContext.destination);
  }

  getNode() {
    return this.amplitude;
  }
}

export default Amplitude;