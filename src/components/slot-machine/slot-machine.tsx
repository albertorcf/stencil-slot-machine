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
    console.log('spin');
    this.slot1.addEventListener("transitionend", this.onComplete);
    this.setDuration(this.duration);
    this.slot1.style.marginTop = '-300%';
  }

  machine: HTMLElement;
  images: HTMLElement;
  imageCount: number;
  stopping = false;
  slot1: HTMLElement;
  
  componentDidLoad() {
    this.machine = this.el.querySelector('.slot-machine');
    this.images = this.el.querySelector('.images');
    this.imageCount = this.images.children.length;

    this.slot1 = this.images.children[0].querySelector('.image');
    this.slot1.classList.add('slot1');

    let node = this.images.children[0].cloneNode();
    //console.log('node=', node);
    this.images.appendChild(node);
    console.log(this.el);
  }

  setDuration(ms: number) {
    this.duration = ms;
    this.slot1.style.transitionDuration = (ms/1000).toFixed(3) + 's';
  }
  
  setMarginTop(index: number) {
    console.log(index);
    this.slot1.style.marginTop = `-${(index-1)*100}%`;
    console.log(this.slot1.style.marginTop);
  }

  onComplete = () => {
    console.log('onComplete');
    this.slot1.style.transitionDuration = '0s';
    this.slot1.style.marginTop = '0%';
    setTimeout(() => {
      this.setDuration(this.duration);
      this.slot1.style.marginTop = '-300%';
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
