# Introduction to Modules
Modules were created to allow for the bot to easily be configured with seamless integration. We can add/edit/remove modules at any-time without having to restart the bot instance. We can create a range of basic chat commands to complicated algorithms performing in real-time. There is no end to the amount of content you can integrated and generate with this system. We will explore a variety of samples that will help us better understand this modular system.
# Module Designer
There is a tool used to assist with the creation of Modules. At this moment in time it will allow for you to create a basic chat command module. You can find it here: (https://www.lexbot.ca/ModuleCreator/)[https://www.lexbot.ca/ModuleCreator/]
# Chat Command Template
Here is the exact module used to create the !asschest command. It contains all of the required information to ensure basic chat command functionality. This command is throttled to be used once every 30 seconds.
```javascript
module.exports = {
	name: "!asschest",
	description: "Provides an explaination about the asschest glitch in OOT.",
	isChatCommand: true,
	debug: false,
	rate: 1000 * 30,
	tags: ["useful", "information"],
	load: function(addObj)
	{
		for (var i in addObj)
		{
			if (this.debug)
				console.log("\t + Loading addon:", i);
			this[i] = addObj[i];
		}
	},
	callback: function(msgObj)
	{
		var now = new Date();
		if (typeof this.last === "undefined")
			this.last = new Date(now.getTime() - this.rate);
		var diff = now.getTime() - this.last.getTime();
		if (diff >= this.rate)
		{
			this.last = now;
			var args = msgObj.text.explode(" ", 2);
			if (args[1] != "" && args[1].indexOf("@") != 0)
				args[1] = "@" + args[1];
			else if (args[1] == "")
				args[1] = "@" + msgObj.display_name;
			this.sendMessage(msgObj.channel, args[1] + " Ass chest is when you open the Gerudo's ass like a chest and receive the spooky mask. Video: https://www.youtube.com/watch?v=mjlyi-Ie3Us");
		}
	}
};
```