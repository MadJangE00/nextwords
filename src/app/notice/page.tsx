// app/privacy-policy/page.tsx
'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">개인정보 처리방침</h1>

      <p className="mb-4">
        “인디버스”는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련된 고충을 신속하고 원활하게 처리하기 위하여 아래와 같이 개인정보 처리방침을 수립·공개합니다.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 0조 (게임 및 서비스 이용 시)</h2>
        <p className="mb-2">
          “인디버스”는 Unity, Google Play Store의 이용을 위해 허가된 사항 외에 별도의 정보를 수집하지 않습니다.
        </p>
        <ul className="list-disc pl-6 mb-2">
          <li>이용 기기의 하드웨어 정보</li>
          <li>OS 버전 정보</li>
          <li>Unity 기반 인게임 로그 데이터</li>
        </ul>
        <p className="mb-2">또한, 맞춤형 광고 제공을 위해 자동 수집되는 행태정보가 포함될 수 있습니다.</p>
        <ul className="list-disc pl-6">
          <li>광고사업자: Google, Unity Ads</li>
          <li>수집 방법: 앱 실행 시 자동 수집</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 1조 (개인정보의 처리목적)</h2>
        <p className="mb-2">“인디버스”는 다음의 목적을 위해 개인정보를 처리합니다.</p>
        <ul className="list-disc pl-6">
          <li>회원 가입, 본인 인증 및 자격 유지</li>
          <li>서비스 및 콘텐츠 제공, 요금 정산</li>
          <li>민원 처리 및 고지, 통지</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 2조 (개인정보의 처리 및 보유기간)</h2>
        <p className="mb-2">개인정보는 수집 목적 달성 시 또는 아래와 같은 관련 법령에 따라 보유됩니다.</p>
        <ul className="list-disc pl-6">
          <li>표시·광고 기록: 6개월</li>
          <li>계약 및 결제 기록: 5년</li>
          <li>소비자 불만/분쟁 기록: 3년</li>
          <li>통신사실확인자료: 3개월 ~ 1년</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 3조 (개인정보의 제3자 제공)</h2>
        <p>
          정보주체 동의 없이 외부에 제공되지 않으며, 법률상 허용된 경우에만 제3자에게 제공합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 4조 (개인정보처리의 위탁)</h2>
        <p>
          개인정보 업무처리를 외부에 위탁하는 경우 해당 사실을 본 방침에 반영하여 고지합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 5조 (정보주체 권리 및 행사 방법)</h2>
        <ul className="list-disc pl-6">
          <li>열람, 정정, 삭제, 처리정지 요청 가능</li>
          <li>법정대리인, 위임 대리인 통해서도 가능</li>
          <li>법령에 따라 일부 요청은 제한될 수 있음</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 6조 (처리하는 개인정보 항목)</h2>
        <ul className="list-disc pl-6">
          <li>구글 연동 정보: 이메일, 프로필, 닉네임</li>
          <li>자동 수집 항목: IP, 쿠키, 방문기록 등</li>
        </ul>
        <p>※ 제3자 결제시스템의 경우, 인디버스는 직접 계좌 정보 등을 수집하지 않습니다.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 7조 (개인정보의 파기)</h2>
        <ul className="list-disc pl-6">
          <li>보유기간 종료 및 목적 달성 시 즉시 파기</li>
          <li>전자적 파일: 복구 불가 방식으로 삭제</li>
          <li>종이 문서: 분쇄 또는 소각</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 8조 (안전성 확보 조치)</h2>
        <p>분기 1회 이상의 자체 보안 감사 실시</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 9조 (쿠키 사용 및 거부)</h2>
        <ul className="list-disc pl-6">
          <li>맞춤형 정보 제공을 위한 쿠키 사용</li>
          <li>브라우저 설정에서 저장 거부 가능</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 10조 (개인정보 보호책임자)</h2>
        <ul className="list-disc pl-6">
          <li>성명: 윤종혁</li>
          <li>직책: 기술이사</li>
          <li>이메일: yoonjonghyuk9514@gmail.com</li>
          <li>운영 시간: 월~금 (10:00~18:00)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 11조 (권익침해 구제방법)</h2>
        <ul className="list-disc pl-6">
          <li>개인정보분쟁조정위원회: 1833-6972 / www.kopico.go.kr</li>
          <li>개인정보침해신고센터: 118 / privacy.kisa.or.kr</li>
          <li>대검찰청: 1301 / www.spo.go.kr</li>
          <li>경찰청: 182 / cyberbureau.police.go.kr</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">제 12조 (방침 변경)</h2>
        <p>이 방침은 2025년 6월 8일부터 적용됩니다.</p>
      </section>
    </main>
  );
}
