import { Component, Prop, Element, h } from "@stencil/core";

@Component({
  tag: "slot-image",
  styleUrl: "slot-image.css"
})
export class SlotImage {
  @Element() el: HTMLElement;

  @Prop() src: string;

  componentDidLoad() {
    console.log('parent=', this.el.parentNode.parentNode);
    console.log('height=', (this.el.parentNode.parentNode as HTMLElement).scrollHeight);
  }

  render() {
    let url = 'url(' + this.src + ')';

    return (
      <div class="image" style={{backgroundImage:url, backgroundSize:'cover'}}></div>
    );
  }
}