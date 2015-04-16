// attributes => https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text#Styling_text
// TODO Find another name, this one is taken by https://developer.mozilla.org/en/docs/Web/API/Text
// If someone has an idea, I'll take it :/
var Text = function(text, position, attributes, alignment, anchor) { // jshint ignore:line
    Entity.call(this, position, anchor || Anchor.TopLeft);
    this.text = text;
    this.attributes = attributes;
    this.alignment = alignment;
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
