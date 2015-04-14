// attributes => https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text#Styling_text
var Text = function(text, position, attributes, alignment, anchor) {
    this.text = text;
    this.position = position;
    this.attributes = attributes;
    this.alignment = alignment;
    this.anchor = anchor || Anchor.TopLeft;
};

extend(Text, Entity, {
    draw: function(ctx) {
        merge(ctx, this.attributes).fillText(
            this.text,
            this.position.x,
            this.position.y
        );
    },
    // TODO Would it make sense to add getBoundingBox?
});
