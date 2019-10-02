import { Component, Prop, Element, h } from "@stencil/core";

@Component({
  tag: "slot-image",
  styleUrl: "slot-image.css"
})
export class SlotImage {
  @Element() el: HTMLElement;

  @Prop() src: string;

  render() {
    return (
      <div class="image">
        <img src={this.src} />
      </div>
    );
  }
}