/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
module.exports = /** @type {const} */ ({
	/* A form types, that has support only buttons and text (PLEASE SEE THE EXAMPLE PLUGIN BECAUSE MOST FUNCTIONS WILL NOT WORK FOR THIS TYPE OF FORM: https://github.com/greenfrogmc/ExamplePlugin/blob/29d2675aefccb1c4efaf375ac1aca9895d4913b1/exampleplugin.js#L129) */
	FORM: "form",
	/* A form types, that supports every possible field in Minecraft (DOCS: https://github.com/greenfrogmc/ExamplePlugin/blob/29d2675aefccb1c4efaf375ac1aca9895d4913b1/exampleplugin.js#L129) */
	CUSTOM_FORM: "custom_form",
	/* A form types, that supports only 2 buttons and can be used for yes/no answers */
	MODAL_FORM: "modal",
});
