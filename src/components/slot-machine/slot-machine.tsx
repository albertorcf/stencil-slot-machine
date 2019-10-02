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
    this.images.addEventListener("transitionend", this.onComplete);
    this.setDuration(this.duration);
    this.images.style.marginTop = '-300%';
  }

  machine: HTMLElement;
  images: HTMLElement;
  stopping = false;
  
  componentDidLoad() {
    this.machine = this.el.querySelector('.slot-machine');
    this.images = this.el.querySelector('.images');

    let node = this.images.children[0].cloneNode(true);
    this.images.appendChild(node);
  }

  setDuration(ms: number) {
    this.duration = ms;
    this.images.style.transitionDuration = (ms/1000).toFixed(3) + 's';
  }
  
  setMarginTop(index: number) {
    console.log(index);
    this.images.style.marginTop = `-${(index-1)*100}%`;
    console.log(this.images.style.marginTop);
  }

  onComplete = () => {
    console.log('onComplete');
    this.images.style.transitionDuration = '0s';
    this.images.style.marginTop = '0px';
    setTimeout(() => {
      this.setDuration(this.duration);
      this.images.style.marginTop = '-300%';
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
