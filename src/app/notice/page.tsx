'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">개인정보 처리방침</h1>
      <p className="mb-6">
        “인디버스”는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고,
        이와 관련된 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
        개인정보 처리방침을 수립ㆍ공개합니다.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제 0조 (게임 및 서비스 이용 시)</h2>
        <p>
          “인디버스”는 Unity, Google Play Store의 이용을 위해 허가된 사항 외에 별도의
          정보를 수집ㆍ제공하지 않으며, 게임 및 서비스 이용 시 다음의 정보가 수집될 수
          있습니다.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>이용 기기의 하드웨어 정보</li>
          <li>이용 기기의 OS 버전 정보</li>
          <li>Unity를 통해 수집되는 인게임 log 데이터</li>
          <li>
            광고사업자(Google, Unity Ads)를 통한 행태정보 수집 (앱 실행 시 자동 수집)
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제 1조 (개인정보의 처리 목적)</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>홈페이지 회원 가입 및 관리</li>
          <li>서비스 제공 및 콘텐츠 관리</li>
          <li>민원 처리 및 고충 대응</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제 2조 (개인정보의 처리 및 보유기간)</h2>
        <p>“인디버스”는 개인정보를 다음 기간 동안 보유ㆍ이용합니다.</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>서비스 제공 완료 및 정산 완료 시까지</li>
          <li>
            <strong>법령에 의한 예외:</strong>
            <ul className="list-disc pl-6 mt-1">
              <li>표시/광고 관련 기록: 6개월</li>
              <li>계약 및 대금결제 관련 기록: 5년</li>
              <li>소비자 불만 처리 기록: 3년</li>
              <li>통신기록: 3개월 ~ 1년</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제 3조 ~ 제 5조 (개인정보 제3자 제공 및 권리 행사)</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            “인디버스”는 동의 없이 제3자에게 개인정보를 제공하지 않으며, 법령에 의거한
            경우에 한하여 제공합니다.
          </li>
          <li>
            정보주체는 열람, 정정, 삭제, 처리정지 등의 권리를 언제든지 행사할 수
            있습니다.
          </li>
          <li>법정 대리인도 해당 권리를 행사할 수 있습니다.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제 6조 (처리하는 개인정보 항목)</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>구글 계정 정보 (프로필, 닉네임)</li>
          <li>IP, 쿠키, MAC 주소, 서비스 이용기록</li>
          <li>
            결제수단은 제3자 플랫폼(구글 등)을 통해 처리되며 인디버스는 해당 정보를
            수집하지 않습니다.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제 7조 (개인정보의 파기)</h2>
        <p>
          보유기간 경과 또는 처리 목적 달성 시, 해당 개인정보는 즉시 파기됩니다.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>전자파일: 복구 불가능한 방식으로 삭제</li>
          <li>종이 문서: 분쇄기 또는 소각</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제 8조 (개인정보의 안전성 확보조치)</h2>
        <p>정기적 자체 감사(분기 1회)를 통해 개인정보 보호를 점검합니다.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제 9조 (쿠키 운영 및 거부 방법)</h2>
        <p>
          맞춤형 서비스 제공을 위해 쿠키를 사용할 수 있으며, 브라우저 설정을 통해
          쿠키를 거부할 수 있습니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제10조 (개인정보 보호책임자)</h2>
        <p>
          성명: 윤종혁<br />
          직책: 기술이사<br />
          연락처: yoonjonghyuk9514@gmail.com<br />
          근무시간: 월~금 10:00 ~ 18:00 (토/일/공휴일 휴무)
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제11조 (권익침해 구제방법)</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>개인정보분쟁조정위원회: 1833-6972 / www.kopico.go.kr</li>
          <li>개인정보침해신고센터: 118 / privacy.kisa.or.kr</li>
          <li>대검찰청: 1301 / www.spo.go.kr</li>
          <li>경찰청: 182 / cyberbureau.police.go.kr</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">제12조 (변경 공지)</h2>
        <p>
          본 방침은 <strong>2025.06.08</strong>부터 적용되며, 변경 시 사전 공지를 통해
          안내됩니다.
        </p>
      </section>
    </main>
  );
}
