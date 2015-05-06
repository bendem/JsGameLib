var Input = function(game) {
    this.game = game;
    this.keysDown = [];
    this.buttonsDown = [];
    this.touches = [];
    this.mousePosition = new Point();

    game.eventManager.register('mousemove', this.handleMouseMove, this, game.canvas);
    game.eventManager.register('keyup', this.handleKeyUp, this, document);
    game.eventManager.register('keydown', this.handleKeyDown, this, document);
    game.eventManager.register('mousedown', this.handleButtonPressed, this, game.canvas);
    game.eventManager.register('mouseup', this.handleButtonReleased, this, game.canvas);
    // Hack, when the mouse comes or leaves the game, reset the buttons.
    game.eventManager.register('mouseleave', this.handleMouseComesOrLeaves, this, game.canvas);
    game.eventManager.register('mouseover', this.handleMouseComesOrLeaves, this, game.canvas);
};

Input.Modifier = Object.freeze({
    CTRL:  0x01,
    ALT:   0x02,
    SHIFT: 0x04,
});

Input.Button = Object.freeze({
    NONE:   0,
    LEFT:   1,
    MIDDLE: 2,
    RIGHT:  3,
});

Input.prototype = {
    isKeyDown: function(key) {
        key = key.toUpperCase().charCodeAt(0);
        return this.keysDown.indexOf(key) !== -1;
    },

    hasModifier: function(modifiers) {
        var codes = this.modifiersToKeyCodes(modifiers);
        console.log(codes, this.keysDown);
        for (var i = 0; i < codes.length; i++) {
            if(this.keysDown.indexOf(codes[i]) === -1) {
                return false;
            }
        }
        return true;
    },

    isButtonDown: function(button) {
        return this.buttonsDown.indexOf(button) !== -1;
    },

    modifiersToKeyCodes: function(modifiers) {
        var keyCodes = [];
        for(var modifier in Input.Modifier) {
            if(modifiers & Input.Modifier[modifier]) {
                switch (Input.Modifier[modifier]) {
                    case Input.Modifier.SHIFT:
                        keyCodes.push(16);
                        break;
                    case Input.Modifier.CTRL:
                        keyCodes.push(17);
                        break;
                    case Input.Modifier.ALT:
                        keyCodes.push(18);
                        break;
                }
            }
        }
        return keyCodes;
    },

    handleMouseMove: function(name, event) {
        if(Math.abs(event.movementX) + Math.abs(event.movementY) <= 1) {
            return;
        }

        var arg = {
            button: event.which,
            position: new Point(event.offsetX, event.offsetY),
            diff: new Vector(event.offsetX - this.mousePosition.x, event.offsetY - this.mousePosition.y),
        };
        var cancelled = this.game.eventManager.handleEvent('mouse_move', arg);

        if(!cancelled) {
            this.mousePosition.x = event.offsetX;
            this.mousePosition.y = event.offsetY;
        }
        return cancelled;
    },

    handleKeyUp: function(name, event) {
        if(event.repeat) {
            return;
        }
        return this.handleKeyEvent('up', event.keyCode);
    },

    handleKeyDown: function(name, event) {
        if(event.repeat) {
            return;
        }
        return this.handleKeyEvent('down', event.keyCode);
    },

    handleKeyEvent: function(state, keycode) {
        var cancelled;
        switch(keycode) {
            case 16:
                cancelled = this.game.eventManager.handleEvent('shift_' + state);
                break;
            case 17:
                cancelled = this.game.eventManager.handleEvent('ctrl_' + state);
                break;
            case 18:
                cancelled = this.game.eventManager.handleEvent('alt_' + state);
                break;
            default:
                var key = String.fromCharCode(keycode);
                if(key < 'A' || key > 'Z') {
                    cancelled = this.game.eventManager.handleEvent('key_' + state, key);
                } else {
                    cancelled = this.game.eventManager.handleEvent('letter_' + state, key);
                }
                break;
        }

        if(!cancelled) {
            if(state === 'down') {
                this.keysDown.push(keycode);
            } else {
                Arrays.remove(this.keysDown, keycode);
            }
        }
        return cancelled;
    },

    handleButtonPressed: function(name, event) {
        if(this.buttonsDown.indexOf(Input.Button.RIGHT) !== -1) {
            // If the context menu is open, the click will close it and
            // break expected behavior
            this.buttonsDown = [];
            return;
        }

        if(this.buttonsDown.indexOf(event.which) !== -1) {
            return;
        }

        var cancelled = this.game.eventManager.handleEvent(
            this.whichToString(event.which) + '_down',
            this.mousePosition.clone()
        );
        if(cancelled) {
            return true;
        }
        this.buttonsDown.push(event.which);
    },

    handleButtonReleased: function(name, event) {
        if(this.buttonsDown.indexOf(event.which) === -1) {
            return;
        }

        var cancelled = this.game.eventManager.handleEvent(
            this.whichToString(event.which) + '_up',
            this.mousePosition.clone()
        );
        if(cancelled) {
            return true;
        }
        Arrays.remove(this.buttonsDown, event.which);
    },

    handleMouseComesOrLeaves: function(name, event) {
        this.buttonsDown = [];
    },

    whichToString: function(which) {
        for(var name in Input.Button) {
            if(Input.Button[name] === which) {
                return 'button_' + name.toLowerCase();
            }
        }
    },
};
