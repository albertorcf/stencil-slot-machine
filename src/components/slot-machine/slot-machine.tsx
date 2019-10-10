import { Component, Prop, Method, Element, Watch, h } from "@stencil/core";

@Component({
  tag: "slot-machine",
  styleUrl: "slot-machine.css"
})
export class SlotMachine {
  @Element() el: HTMLElement;

  @Prop() duration: number = 1200;  // one spin duration in ms
  @Watch('duration')
  setDurationHandler(newValue: number) {
    this.setDuration(newValue);
  }
  
  @Method()
  async spin() {
    this.stopping = false;
    this.slot1.addEventListener("transitionend", this.onComplete);
    this.setDuration(this.initDuration);
    this.setMarginTop(this.imageCount);
  }

  @Method()
  async stop(ms: number) {
    setTimeout(() => {
      this.stopping = true;
    }, ms);
    return new Promise<number>((resolve) => {this.resolve = resolve});
  }

  @Prop({mutable: true}) stopElement: any;

  machine: HTMLElement;
  images: HTMLElement;
  imageCount: number;
  stopping = false;
  slot1: HTMLElement;
  initDuration: number;
  stopPromise: Promise<number>;
  resolve: Function;
  
  componentDidLoad() {
    this.machine = this.el.querySelector('.slot-machine');
    this.images = this.el.querySelector('.images');
    this.imageCount = this.images.children.length;
    let children0 = this.images.children[0];

    this.slot1 = this.images.querySelector('.image');
    
    let slot: HTMLElement = this.images.children[0].cloneNode(false) as HTMLElement;
    slot.setAttribute('src', children0.children[0].children[0].getAttribute('src'));
    this.images.appendChild(slot);

    this.slot1.classList.add('slot1');
    this.initDuration = this.duration;
    //console.log(this.el);
  }

  setDuration(ms: number) {
    this.duration = ms;
    this.slot1.style.transitionDuration = (ms/1000).toFixed(4) + 's';
  }
  
  setMarginTop(index: number) {
    this.slot1.style.marginTop = `-${(index)*100}%`;
  }

  onComplete = () => {
    this.slot1.style.transitionDuration = '0s';
    this.slot1.style.marginTop = '0%';
    setTimeout(() => {
      if (!this.stopping) {
        this.setDuration(this.duration);
        this.setMarginTop(this.imageCount);
      } else {
        this.slot1.removeEventListener("transitionend", this.onComplete);
        let r = Math.floor(Math.random()*this.imageCount)+1; // random index between 1 and imgCount
        console.log('r=',r);
        this.stopElement = this.images.children[r-1];
        this.resolve(r);
        console.log(r, this.stopElement, this.stopElement.getAttribute('name'));
        this.setDuration((this.duration/this.imageCount)*(r-1));
        this.setMarginTop(r-1);
      }
    }, 0);
  }
  
  render() {
    return (
      <div class="slot-machine">
        <div class="images">
          <slot />
        </div>
      </div>
    );
  }
}