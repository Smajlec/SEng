/* Main Engine Class */
var SEng = {

	TargetCanvas : null,
	TargetCanvasContext : null,

	Time60FPS : 1000 / 60,
	Time30FPS : 1000 / 30,

	FrameCount : 0,

	FPSSum : 0,

	LastFrame : Date.now(),
	DeltaTime : 0,

	MouseX : 0,
	MouseY : 0,

	GameObjects : [],

	Debugging : true,

	/* Logging */
	Log : function(text) {
		console.log("[SEng][" + new Date().toLocaleTimeString() + "] " + text + ".");
	},

	/* Main Engine related stuff */
	SetCanvas : function(canvasElement) {
		SEng.TargetCanvas = canvasElement;
		SEng.TargetCanvasContext = SEng.TargetCanvas.getContext("2d");

		/* Hooking canvas events */
		SEng.TargetCanvas.onmousemove = function(event) {
			canvasRect = SEng.TargetCanvas.getBoundingClientRect();
			SEng.MouseX = event.clientX - canvasRect.left;
			SEng.MouseY = event.clientY - canvasRect.top;
		}

		SEng.Log("Target canvas Set");
	},

	Resize : function(w, h) {

		if (SEng.TargetCanvasContext == null) {
			SEng.Log("Canvas not declared properly");
			return;
		}

		SEng.TargetCanvas.width = w;
		SEng.TargetCanvas.height = h;

		SEng.Log("Target canvas resized to " + SEng.TargetCanvas.width +  "x" + SEng.TargetCanvas.height);
	},

	Render : function() {

		if (SEng.TargetCanvasContext == null) {
			SEng.Log("Canvas not declared properly");
			return;
		}

		/* Required calculations */
		SEng.DeltaTime = Date.now() - SEng.LastFrame;

		/* Clearing */
		SEng.TargetCanvasContext.fillStyle = "#000000";
		SEng.TargetCanvasContext.fillRect(0, 0, SEng.TargetCanvas.width, SEng.TargetCanvas.height);

		/* Debug info */
		if (SEng.Debugging) {
			SEng.TargetCanvasContext.fillStyle = "#00FF00";
			SEng.TargetCanvasContext.fillText(Math.round(1000 / SEng.DeltaTime) + "fps, Avg: " + Math.round(SEng.FPSSum / SEng.FrameCount) + "fps", 10, 15);
			SEng.TargetCanvasContext.fillText("total objs " + SEng.GameObjects.length, 10, 25);

			for (i=0; i < SEng.GameObjects.length; i++) {
				SEng.TargetCanvasContext.fillText(SEng.GameObjects[i].sprite, SEng.GameObjects[i].x, SEng.GameObjects[i].y - 5);
				SEng.TargetCanvasContext.fillText(SEng.GameObjects[i].x + ", " + SEng.GameObjects[i].y, SEng.GameObjects[i].x, SEng.GameObjects[i].y + 5);
			}
		}

		/* Storing values for later usage */
		SEng.FrameCount += 1;
		SEng.FPSSum += 1000 / SEng.DeltaTime;

		SEng.LastFrame = Date.now();
	},

	SetDebugging : function (enabled) {
		SEng.Debugging = enabled;

		SEng.Log("Debugging " + SEng.Debugging.toString());
	}

}

/* Game Object */
var GameObject = function(sprite, x, y) {

	this.sprite = sprite;

	this.x = x;
	this.y = y;

	SEng.GameObjects.push(this);

	SEng.Log("New GameObject added at " + this.x + ", " + this.y);
}