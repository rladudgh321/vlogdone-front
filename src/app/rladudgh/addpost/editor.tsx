'use client';

import { uploadImageAPI } from '@/app/apis/post';
import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor({ html, setHtml }: any): any {
  const quillRef = useRef(null) as any;
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      try {
        const file = input.files;
        if (!file || file.length === 0) {
          console.error('No file selected.');
          return;
        }
        const imageFormData = new FormData();
        [].forEach.call(file, (f) => {
          imageFormData.append('file', f);
        });
        const res = await uploadImageAPI(imageFormData);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        if (range) {
          editor.insertEmbed(range.index, 'image', res);
          editor.setSelection(range.index + 1);
        } else {
          console.error('Could not get editor selection.');
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image'],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'image',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      onChange={setHtml}
      modules={modules}
      formats={formats}
      value={html}
      placeholder={'오늘은 어떤 창의적인 글을 작성해볼까요!?'}
      theme="snow"
    />
  );
}
