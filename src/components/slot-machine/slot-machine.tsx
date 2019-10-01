import { Component, Method, Element, h } from "@stencil/core";

@Component({
  tag: "slot-machine",
  styleUrl: "slot-machine.css"
})
export class SlotMachine {
  @Element() el: HTMLElement;

  @Method()
  async spin() {
    console.log('spin');
    const e: any = this.el.querySelector('.images');
    e.style.marginTop = '-300%';
  }

  machine: any;
  images: any;
  stopping = false;
  duration = 1500;

  componentDidLoad() {
    this.machine = this.el.querySelector('.slot-machine');
    this.images = this.el.querySelector('.images');

    let node = this.images.children[0].cloneNode();
    this.images.appendChild(node);

    //image1.classList.add("image1");

    //console.log('slot-machine=', this.el);
    //console.log('this.machine=', this.machine);
    //console.log('images=', this.images.children);
    //console.log('parent=', this.el.parentNode);
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
    console.log(this.images.style.marginTop);
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
