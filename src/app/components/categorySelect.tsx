'use client';

import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface categoryListProp {
  id: string;
  name: string;
}

export default function CategorySelectComponent({
  categoryList,
}: {
  categoryList: categoryListProp[];
}) {
  const { setValue } = useFormContext();
  const [selectedTags, setSelectedTags] = useState<
    { id: string; name: string }[]
  >([]);

  // 태그를 선택할 때마다 selectedTags 상태 업데이트
  const handleTagSelect = (tag: { id: string; name: string }) => {
    setSelectedTags((prevTags) =>
      prevTags.some((t) => t.id === tag.id)
        ? prevTags.filter((t) => t.id !== tag.id)
        : [...prevTags, tag],
    );
  };

  // selectedTags 상태가 변경될 때마다 react-hook-form의 setValue로 값을 설정
  useEffect(() => {
    // `tags` 배열이 로드된 후 `selectedTags`를 폼 필드로 설정
    setValue('categories', selectedTags);
  }, [selectedTags, setValue]); // selectedTags가 바뀔 때마다 setValue 실행

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">태그</label>
      <div className="flex space-x-3">
        {categoryList.map((v: categoryListProp) => (
          <button
            type="button"
            key={v.id} // `id`를 key로 사용
            onClick={() => handleTagSelect(v)} // 카테고리 객체를 전달
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedTags.some((tag) => tag.id === v.id)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>
      {selectedTags.length === 0 && (
        <span className="text-red-500 text-sm">
          적어도 하나의 태그를 선택하세요.
        </span>
      )}
    </div>
  );
}
