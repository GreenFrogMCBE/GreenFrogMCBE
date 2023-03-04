/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
module.exports = {
  /* A form type, that has support only buttons and text (PLEASE SEE THE EXAMPLE PLUGIN BECAUSE MOST FUNCTIONS WILL NOT WORK FOR THIS TYPE OF FORM: https://github.com/greenfrogmc/ExamplePlugin/blob/29d2675aefccb1c4efaf375ac1aca9895d4913b1/exampleplugin.js#L129) */
  FORM: "form",
  /* A form type, that supports every possible field in Minecraft (DOCS: https://github.com/greenfrogmc/ExamplePlugin/blob/29d2675aefccb1c4efaf375ac1aca9895d4913b1/exampleplugin.js#L129) */
  CUSTOMFORM: "custom_form",
  /* A form type, that supports only 2 buttons and can be used for yes/no answers */
  MODALFORM: "modal"
};
