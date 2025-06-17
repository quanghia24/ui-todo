'use client'

import { useState } from "react"
import ActionButton from "./ActionButton";
import { Card, CardContent, TextField, Divider } from "@mui/material";
import MoodPicker from "../features/post/moodPicker";
import { createNewPost } from "@/db/queries/post.queries";
import { InsertPostPayload } from "@/types/types"; 

export type moodType = "sad" | "ok" | "happy"


export default function AddPostButton() {
  const [openInputModal, setOpenInputModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [mood, setMood] = useState<moodType>("ok")

  const handleClickAddButton = () => {
    setOpenInputModal(!openInputModal);
  }

  const handleSubmit = () => { 
    const newPost: InsertPostPayload = {
      title: title,
      description: description,
      authId: "",
      mood: mood,

    }
    createNewPost(newPost);
    setOpenInputModal(false);
  }
  return (
    <>
      <div className="p-3">
        <ActionButton mcolor={openInputModal?"error":"inherit"} handler={handleClickAddButton} text={openInputModal?"Cancel":"Tell us your thought"}/>
        {openInputModal && <ActionButton mcolor="success" handler={handleSubmit} text="Submit"/>}
      </div>
      {openInputModal && 
      <div 
        className="py-2.5 flex justify-center"
      > 
        <Card className="p-3  h-[80vh]">
            <MoodPicker handlePickMood={setMood} mood={mood}/>
            <Divider orientation="horizontal"/>    
            <CardContent>
                <form action={() => {}}>
                    <TextField
                        sx={{
                            mb: 2,
                            '& .MuiInputBase-input': {
                                fontSize: '1.5rem', // Increase font size for input text
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '1.2rem', // Increase font size for label
                            },
                        }}
                        fullWidth
                        label="Title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}           
                    />
                    {/* Description */}
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"  
                        multiline
                        fullWidth
                        rows={22}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}                       
                    />
                </form>
            </CardContent>
        </Card> 
      </div> 
      }
    </>
  )
}