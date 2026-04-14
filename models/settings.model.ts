import mongoose, { Schema } from "mongoose";

interface ISettings {
    ownerId: string
    businessName: string
    supportEmail: string
    knowledgeBase: string
}

const settingsSchema = new Schema<ISettings>({
    ownerId: {
        type: String,
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        // required: true
    },
    supportEmail: {
        type: String,
        // required: true
    },
    knowledgeBase: {
        type: String,
        // required: true
    }
},{
    timestamps: true
})

export const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema)
