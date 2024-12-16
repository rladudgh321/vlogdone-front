'use client';

import { uploadImageAPI } from '@/app/apis/post';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import { SlCloudUpload } from 'react-icons/sl';
import dynamic from 'next/dynamic';
import CategorySelectComponent from '@/app/components/categorySelect.tsx';

dayjs.locale('ko');
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

interface categoryListProps {
  id: string;
  name: string;
}

const DatePickerComponent: any = dynamic(
  () => import('./date-picker.tsx') as any,
  {
    loading: () => <p>Loading...</p>,
  },
);

function TitleComponent({
  createdAt,
  params,
  TitleComponentData,
  forWhat,
  categoryList,
  setCategory,
  setHighlight,
  select,
  setSelect,
  profileImage,
  setProfileImage,
}: {
  createdAt: Date | null;
  params: string | null;
  categoryList: categoryListProps[];
  setCategory: Dispatch<SetStateAction<[string, string]>>;
  setHighlight: Dispatch<SetStateAction<boolean>>;
  forWhat: string;
  TitleComponentData: any;
  setSelect: Dispatch<SetStateAction<Date>>;
  select: Date;
  profileImage: string;
  setProfileImage: Dispatch<SetStateAction<string>>;
}) {
  const { watch, register, setValue } = useFormContext();

  dayjs.tz.setDefault('Asia/Seoul');

  setHighlight(watch('highlight'));
  const [dateOpened, setDateOpened] = useState<boolean>(false);
  const onToggleDatePicker = useCallback(() => {
    setDateOpened((prev) => !prev);
  }, []);

  const imageInput = useRef(null) as any;
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onChangeImages = useCallback(
    async (e: any) => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('file', f);
      });
      const res = await uploadImageAPI(imageFormData);
      setProfileImage(res);
    },
    [setProfileImage],
  );

  const onClickRemoveProfileImage = useCallback(() => {
    if (window.confirm('정말로 삭제하시겠습니까??')) {
      setProfileImage('');
      return false;
    }
  }, [setProfileImage]);

  useEffect(() => {
    if (TitleComponentData) {
      setValue('category_type', TitleComponentData?.category?.id); // Set initial category
      setValue('highlight', TitleComponentData.highlight);
      setProfileImage(TitleComponentData.image);
    }
  }, [TitleComponentData, setProfileImage, setValue]);

  return (
    <div className="max-w-[768px] text-center mx-auto mt-10">
      <div className="">
        <h2 className="blog-title">{forWhat}</h2>
      </div>
      <div className="flex items-center gap-4 my-4">
        <div className="blog-date">
          <div onClick={onToggleDatePicker}>
            {dayjs(select).tz().format('YYYY/MM/DD')}
          </div>
          {dateOpened && (
            <div>
              <br />
              <DatePickerComponent
                createdAt={createdAt}
                params={params}
                select={select}
                setSelect={setSelect}
              />
            </div>
          )}
        </div>
        <div className="blog-date">
          <CategorySelectComponent categoryList={categoryList} />
        </div>
        <div className="blog-date">
          <label className="mr-1" htmlFor="highlight">
            하이라이트 여부
          </label>
          <input
            id="highlight"
            type="checkbox"
            {...register('highlight')}
            checked={watch('highlight')}
          />
        </div>
      </div>
      <div className="flex justify-center">
        {!profileImage ? (
          <SlCloudUpload
            onClick={onClickImageUpload}
            className="w-[400px] h-[400px] text-blue-400 cursor-pointer"
          />
        ) : (
          <div onClick={onClickRemoveProfileImage}>
            <img src={profileImage} alt="img" />
          </div>
        )}
        <input type="file" hidden ref={imageInput} onChange={onChangeImages} />
      </div>
    </div>
  );
}

export default TitleComponent;
