var Direction = Object.freeze({
    Up   : 0,
    Left : 1,
    Down : 2,
    Right: 3
});

var VerticalPosition = Object.freeze({
    Top   : 0,
    Middle: 1,
    Bottom: 2
});

var HorizontalPosition = Object.freeze({
    Left  : 0,
    Middle: 1,
    Right : 2
});

var Anchor;

// Hide implementation, that should not be accessed directly
(function() {
    /**
     * Represents anchor position of plan coordinates.
     *
     * @param HorizontalPosition
     * @param VerticalPosition
     */
    var Position = function(hPos, vPos) {
        this.hPos = hPos;
        this.vPos = vPos;
    };

    Position.prototype = {
        /**
         * Converts relative coordinates to absolute coordinates based
         * on the canvas dimensions (or specified dimensions).
         *
         * @param  Point  The relative point to convert
         * @param  Number The width to use for conversion
         * @param  Number The height to use for conversion
         * @return Point
         */
        convertPoint: function(point, width, height) {
            return new Point(
                this.convertX(point.x, width),
                this.convertY(point.y, height)
            );
        },

        convertX: function(x, width) {
            switch(this.hPos) {
                case HorizontalPosition.Left:
                    return x;
                case HorizontalPosition.Middle:
                    return width / 2 + x;
                case HorizontalPosition.Right:
                    return width - x;
            }
        },

        convertY: function(y, height) {
            switch(this.vPos) {
                case VerticalPosition.Top:
                    return y;
                case VerticalPosition.Middle:
                    return height / 2 + y;
                case VerticalPosition.Bottom:
                    y = height - y;
            }
        }
    };

    Anchor = Object.freeze({
        TopLeft     : new Position(HorizontalPosition.Left, VerticalPosition.Top),
        MiddleLeft  : new Position(HorizontalPosition.Left, VerticalPosition.Middle),
        BottomLeft  : new Position(HorizontalPosition.Left, VerticalPosition.Bottom),
        TopMiddle   : new Position(HorizontalPosition.Middle, VerticalPosition.Top),
        MiddleMiddle: new Position(HorizontalPosition.Middle, VerticalPosition.Middle),
        BottomMiddle: new Position(HorizontalPosition.Middle, VerticalPosition.Bottom),
        TopRight    : new Position(HorizontalPosition.Right, VerticalPosition.Top),
        MiddleRight : new Position(HorizontalPosition.Right, VerticalPosition.Middle),
        BottomRight : new Position(HorizontalPosition.Right, VerticalPosition.Bottom)
    });
})();
