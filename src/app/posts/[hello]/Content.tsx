import { memo } from 'react';

function ContentComponent({ content }: { content: string }) {
  return (
    <div className="max-w-[768px] text-left mx-auto my-10 text-2xl">
      {/* {content} */}
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}

export default memo(ContentComponent);
