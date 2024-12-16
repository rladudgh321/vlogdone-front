export default function AboutText() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Main Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        안녕하세요, 블로그 주인입니다!
      </h1>
      <div className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
        <p className="mb-4">
          인사말을 전하고자{' '}
          <span className="font-semibold text-blue-600">About 페이지</span>를
          만들었습니다.
        </p>
        <p className="mb-4">
          저는 코딩에 코짜도 모르는 일반인이었습니다. 그런 관점에서 여러분들은
          저보다 더 잘할 수 있다는 용기도 드리고 싶기에 이 블로그를
          만들었습니다.
        </p>
        <p className="mb-4">
          이 블로그는 2024년 연말에 블로그를 개설하게 되었고, 저의 지식을
          여러분들과 공유하고 현재 블로그를 다듬어나갈 목적으로 JS언어로
          만들었습니다 (타입스크립트입니다 - Nextjs & Nestjs & AWS).
        </p>
        <p className="mb-4">
          저는 기술블로그로써 Nextjs와 Nestjs, AWS, Docker와 지금은 아니지만
          쿠버네티스도 나중에 다뤄보려고 합니다. 저도 배우고 있지만 AI로 핫한
          파이썬도 기대해주세요!
        </p>
        <p className="mb-4">
          이 블로그에 대해 궁금하신 점이나 문의사항이 있으면{' '}
          <span className="font-semibold text-blue-600">
            kyh_0625@naver.com
          </span>{' '}
          이 주소로 문의 부탁드립니다.
        </p>
        <p className="mb-4 font-semibold text-gray-800">
          그리고 제일 중요한 거!!... 광고나 협찬은 언제든 대환영입니다. ^.^
        </p>
        <p className="mb-4">
          이 블로그가 성장하면서 UI(User Interface)가 바뀔 부분이 많을 거라고
          예상됩니다. 앞으로 블로그 게시글도 쓰면서 불편한 UI도 점점 없어질
          것이고요.
        </p>
        <p className="mb-4">
          내부에 어떤 로직을 사용했는지, 클린 코드와 디자인 시스템, 그리고
          초보자 입장에서 어떻게 이런 코드를 작성했는지를 풀어가려고 합니다.
        </p>
        <p className="mb-4 font-semibold text-gray-800">
          즐겨찾기 해두시고, 변화 과정을 지켜보세요!
        </p>
      </div>
      {/* Footer or contact */}
      <div className="mt-6 text-center text-sm text-gray-500">
        모든 지식을 공유하고 연구하며 더 나은 블로그로 만들어 가겠습니다.
        응원해주세요! *^.^*
      </div>
    </div>
  );
}
