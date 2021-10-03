import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface IProps {
    body: string
    setBody: (value: string) => void
}

const LiteQuill:React.FC<IProps> = ({body, setBody}) => {
    const modules = {toolbar: {container}}
    return (
        <div className="text-editor">
            <ReactQuill theme="snow"
                modules={modules}
                placeholder="Write something..."
                onChange={e => setBody(e)}
                value={body}
            />
        </div>
    )
}

let container = [
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  ]
export default LiteQuill
