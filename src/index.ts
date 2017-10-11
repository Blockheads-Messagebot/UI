import { MessageBot } from '@bhmb/bot'
import page from './layout.html'
import api from './api'
import './style.scss'
import polyfill from './polyfill'


export interface TemplateRule {
    /**
     * The CSS selector to be used to find elements to update.
     */
    selector: string
    /**
     * The text to set in the element.
     */
    text?: string
    /**
     * If the text is not set, can be used to set the HTML of the element.
     */
    html?: string
    /**
     * Any other attributes to be set on the element.
     */
    [key: string]: any
}

export interface UIExtensionExports {
    /**
     * Shows or hides the page menu.
     */
    toggleMenu: () => void
    /**
     * Adds a tab to the page, the children of the returned <div> may be modified however you like. If the group does not exist this method will throw.
     *
     * @param text the text which should appear in the menu for the tab
     * @param groupName the tab group to add the tab to, if omitted the tab will be added to the root navigation.
     * @return the div which the tab content should be placed in.
     */
    addTab: (text: string, groupName?: string) => HTMLDivElement
    /**
     * Removes a tab from the page, if it exists, otherwise has no effect.
     *
     * @param content the tab which should be removed.
     */
    removeTab: (content: HTMLDivElement) => void
    /**
     * Adds a new tab group to the page, if it does not already exist. If it exists, the text of the group will be updated. Supplying a new parent name will not update the parent. If the parent group does not exist, the method will throw.
     *
     * @param text the text to display in group dropdown
     * @param groupName the name of the group to create or update
     * @param parent the parent of this group, if not provided the group will be added to the root of the navigation tree.
     */
    addTabGroup: (text: string, groupName: string, parent?: string) => void
    /**
     * Removes a tab group and all tabs contained within the group.
     *
     * @param groupName the group to remove.
     */
    removeTabGroup: (groupName: string) => void
    /**
     * Builds a template into a new node using the provided rules.
     *
     * @param template the template to clone.
     * @param target the parent node to append the cloned template to.
     * @param rules the rules to apply to the cloned template before appending it to the target.
     */
    buildTemplate: (template: string | HTMLTemplateElement, target: string | HTMLElement, rules: TemplateRule[]) => void
    /**
     * Sends a non-critical alert to the user, should be used in place of [[UIExtensionExports.alert]] if possible as it is non-blocking.
     *
     * @param text the text (not html) to display in the notification.
     * @param displayTime the number of seconds to display the alert for. Default of 2 seconds.
     */
    notify: (text: string, displayTime?: number) => void
    /**
     * Requires a response from the user with a modal box.
     *
     * @param html the html to be set for the modal body.
     * @param buttons buttons that the user can click to close the modal, for each item, if it is a string it will be set as the text with the default style, or the text can be specified explicitly. If no buttons are specified, a generic OK button will be used.
     * @param callback will be called when the alert is closed as a result of the user clicking on one of the provided buttons. It will be passed a single argument with the text of the button clicked.
     */
    alert: (html: string, buttons?: Array<{ text: string, style?: string } | string>, callback?: (text: string) => void) => void
    /**
     * Utility method for getting text from the user.
     *
     * @param text displayed to the user when asking for input
     * @param callback will be called once the user clicks OK with the input, or an empty string if no input was supplied.
     */
    prompt: (text: string, callback?: (response: string) => void) => void
}

MessageBot.registerExtension('ui', function (ex) {
    if (typeof document == 'undefined') {
        throw new Error('This extension cannot be loaded outside of a browser environment.')
    }

    ex.uninstall = function () {
        throw new Error('The UI extension cannot be removed once loaded')
    }

    // Page creation
    document.body.innerHTML = page
    document.head.querySelectorAll('link').forEach(el => el.remove())
    let style = document.head.appendChild(document.createElement('link'))
    style.rel = 'stylesheet'
    style.href = 'https://gitcdn.xyz/repo/Blockheads-Messagebot/UI/master/index.css'
    polyfill()

    // Expose api
    ex.exports = api()
})
