'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { Controller, useFormContext } from 'react-hook-form';

dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);

type Inputs = {
  date_hour: number;
  date_minute: number;
};

function DatePickerComponent({
  createdAt,
  params,
  select,
  setSelect,
}: {
  createdAt: Date | null;
  params: string | null;
  select: Date;
  setSelect: Dispatch<SetStateAction<Date>>;
}) {
  const { control } = useFormContext<Inputs>();
  dayjs.tz.setDefault('Asia/Seoul');

  let date = createdAt ? dayjs(createdAt).toDate() : null;
  const date_hour = date?.getHours() || undefined;
  const date_minute = date?.getMinutes() || undefined;

  const footerProps = (
    <div>
      {select
        ? `${select.toLocaleDateString()}로 작성됩니다`
        : '날짜를 선택해주세요'}
      <div className="flex gap-x-2">
        <label htmlFor="date_time">시간설정</label>
        <Controller
          name="date_hour"
          control={control}
          defaultValue={date_hour}
          render={({ field }: any) => (
            <input
              id="date_hour"
              type="number"
              placeholder="24시"
              max={23}
              min={0}
              {...field}
            />
          )}
        />
        <Controller
          name="date_minute"
          control={control}
          defaultValue={date_minute}
          render={({ field }: any) => (
            <input
              type="number"
              id="date_minute"
              placeholder="0분"
              max={59}
              min={0}
              {...field}
            />
          )}
        />
      </div>
      <div>시간을 미입력시 현재시간을 기본값을 설정</div>
    </div>
  );

  useEffect(() => {
    const loadStyles = async () => {
      await import('react-day-picker/style.css');
    };
    loadStyles();
  }, []);

  return (
    <DayPicker
      required={true}
      mode="single"
      selected={select}
      onSelect={setSelect}
      footer={footerProps}
    />
  );
}

export default DatePickerComponent;
