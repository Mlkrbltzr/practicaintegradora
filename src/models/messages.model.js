import mongoose from "mongoose";

const messagesColletion = "messages" //quite una s a messages

const messagesSchema = new mongoose.Schema({
    user: {type: String, max: 100, required:true},
    message: { type: String, max:100, required:true}
});
export const messagesModel = mongoose.model(messagesColletion,messagesSchema)