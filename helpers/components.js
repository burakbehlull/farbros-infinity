import { ButtonBuilder, ButtonStyle, ActionRowBuilder,
    ModalBuilder, TextInputStyle, TextInputBuilder } from "discord.js"

class Button {
    constructor(){
        this.buttons = []
        this.style = ButtonStyle
    }
    add(customId, label, style, emoji, disabled){
        if(!customId || !label || !style) return
        
        const btn = new ButtonBuilder()
            .setCustomId(customId)
            .setLabel(label)
        if(emoji) btn.setEmoji(emoji)
        if(disabled) btn.setDisabled(disabled)
        if(style) btn.setStyle(style)
        this.buttons.push(btn)

    }
    build(){
        const rows = new ActionRowBuilder().addComponents(...this.buttons)
        return rows
    }
}

class Modal {
    constructor(customId, title){
        if(!customId || !title) return;
        this.customId = customId
        this.title = title
        this.inputs = []
        this.modal = new ModalBuilder()
            .setCustomId(customId)
            .setTitle(title)
    }
    add(customId, label, props= {
        value:undefined,
        paragraph: false,
        required: false,
        placeholder: undefined, 
        max: undefined, 
        min: undefined,
    }){
        if(!customId || !label) return;
        const input = new TextInputBuilder()
            .setCustomId(customId)
            .setLabel(label)
        if(props.paragraph){
            input.setStyle(TextInputStyle.Paragraph)
        } else {
            input.setStyle(TextInputStyle.Short)
        }
        if(props.value) input.setValue(props.value)
        if(props.placeholder) input.setPlaceholder(props.placeholder)
            
        if(props.required){
            input.setRequired(true) 
        } else {
            input.setRequired(false)
        }
        if(props.max) input.setMaxLength(props.max)
        if(props.min) input.setMinLength(props.min)
        this.inputs.push(input)
        return;
    }
    build(){
		const rows = this.inputs.map((component) =>
            new ActionRowBuilder().addComponents(component),
        )
        return this.modal.addComponents(...rows)
    }
}

export {
    Button,
    Modal
}