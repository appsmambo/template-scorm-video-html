class ScormApiWrapper {
    constructor() {
        this.scorm = null;
        this.initSuccess = false;
        this.progress = 0;
    }

    initialize() {
        if (typeof API !== "undefined" && API !== null) {
            this.scorm = API;
        } else if (typeof API_1484_11 !== "undefined" && API_1484_11 !== null) {
            this.scorm = API_1484_11;
        }

        if (this.scorm) {
            this.initSuccess = this.scorm.LMSInitialize("") === "true" || this.scorm.Initialize("") === "true";
            console.log("SCORM initialized: " + this.initSuccess);
        } else {
            console.warn("SCORM API not found");
        }
    }

    setProgress(progress) {
        if (this.initSuccess && this.scorm) {
            this.scorm.LMSSetValue("cmi.core.lesson_status", "incomplete");
            this.scorm.LMSSetValue("cmi.core.lesson_location", progress.toString());
            this.scorm.LMSCommit("");
            console.log("SCORM progress updated: " + progress + "%");
        }
    }

    setCompletion(completed) {
        if (this.initSuccess && this.scorm) {
            this.scorm.LMSSetValue("cmi.core.lesson_status", completed ? "completed" : "incomplete");
            this.scorm.LMSCommit("");
            console.log("SCORM lesson status: " + (completed ? "completed" : "incomplete"));
        }
    }

    terminate() {
        if (this.initSuccess && this.scorm) {
            this.scorm.LMSFinish("") || this.scorm.Terminate("");
            console.log("SCORM session terminated");
        }
    }
}

