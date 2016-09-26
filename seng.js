/* Variables */
var SEng = SEng || {

	TargetCanvas : null,
	TargetCanvasContext : null,

	Time60FPS : 1000 / 60,
	Time30FPS : 1000 / 30,

	FrameCount : 0,

	FPSSum : 0,

	LastFrame : Date.now(),
	DeltaTime : 0,

	Debugging : true,

	/* Logging */
	Log : function(text) {
		console.log("[SEng][" + new Date().toLocaleTimeString() + "] " + text + ".");
	},

	/* Main Engine related stuff */
	SetCanvas : function(canvasElement) {
		SEng.TargetCanvas = canvasElement;
		SEng.TargetCanvasContext = SEng.TargetCanvas.getContext("2d");
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

		/* Required calculations */
		SEng.DeltaTime = Date.now() - SEng.LastFrame;

		/* Clearing */
		SEng.TargetCanvasContext.fillStyle = "#000000";
		SEng.TargetCanvasContext.fillRect(0, 0, SEng.TargetCanvas.width, SEng.TargetCanvas.height);

		/* Debug info */
		if (SEng.Debugging) {
			SEng.TargetCanvasContext.fillStyle = "#00FF00";
			SEng.TargetCanvasContext.fillText(Math.round(1000 / SEng.DeltaTime) + "fps, Avg: " + Math.round(SEng.FPSSum / SEng.FrameCount) + "fps", 15, 15);
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