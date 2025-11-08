import svgPaths from "./svg-ybbzqs9jzf";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['PingFang_TC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-gray-900 text-nowrap">
        <p className="leading-[28px] whitespace-pre">收件匣</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">客戶訊息管理</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Heading />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="box-border content-stretch flex items-center pl-[16px] pr-0 py-0 relative shrink-0" data-name="Container">
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 content-stretch flex gap-[430.3px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <Container2 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[73px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-neutral-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[73px] items-start pb-[21px] pt-[20px] px-[24px] relative w-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">使用量</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p11304070} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container4 />
      <Margin />
    </div>
  );
}

function Container7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-2.842e_-14px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-green-600 text-nowrap">
        <p className="leading-[16px] whitespace-pre">0/100</p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start p-[4px] relative rounded-[4px] shrink-0" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-2.842e_-14px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container7 />
      <Margin1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="box-border content-stretch flex items-center justify-between p-[8px] relative rounded-[8px] shrink-0 w-[303px]" data-name="Container">
      <Container6 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="box-border content-stretch flex flex-col items-start overflow-clip px-0 py-[1.5px] relative shrink-0 w-[133px]" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 text-nowrap">
        <p className="leading-[normal] whitespace-pre">搜尋對話（即時過濾 / Enter 搜尋全部）</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-start justify-center pl-[41px] pr-[113px] py-[9px] relative w-full">
          <Container11 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Svg2() {
  return (
    <div className="absolute left-[12px] size-[16px] top-1/2 translate-y-[-50%]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">搜尋</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#e7c419] bottom-[1.8%] box-border content-stretch flex items-center justify-center px-[13px] py-[7px] right-[8px] rounded-[8px] top-[4.88%]" data-name="Button">
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Svg2 />
      <Button />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">尚無標籤</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-gray-100 box-border content-stretch flex items-center px-[13px] py-[9px] relative rounded-[6px] shrink-0 w-[167px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a4a4a] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">全部狀態</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]" data-name="Frame">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #4A4A4A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 size-[16px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="box-border content-stretch flex flex-col h-[16px] items-start pl-[8px] pr-0 py-0 relative shrink-0 w-[24px]" data-name="SVG:margin">
      <Svg3 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[13px] py-[9px] relative w-full">
          <Container15 />
          <SvgMargin />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[112px]" data-name="Container">
      <Button1 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <Container16 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p29efa600} id="Vector" stroke="var(--stroke-0, #4A4A4A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3042bc80} id="Vector_2" stroke="var(--stroke-0, #4A4A4A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a4a4a] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">過濾未讀</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[6px] items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Svg4 />
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Button2 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container13 />
      <Container20 />
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[211px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[211px] items-start pb-[17px] pt-[8px] px-[16px] relative w-full">
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-gray-500 text-nowrap">
        <p className="leading-[28px] whitespace-pre">沒有對話</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">當有新訊息時，對話會出現在這裡</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[272px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container24 />
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-full items-start max-w-[320px] min-w-[320px] pl-0 pr-px py-0 relative shrink-0 w-[320px]" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-neutral-200 border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Container25 />
    </div>
  );
}

function Container26() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <div className="basis-0 flex flex-col font-['PingFang_TC:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-center text-gray-500">
        <p className="leading-[24px]">請選擇一個對話</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Background">
      <Container26 />
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex h-[490px] items-start max-w-[944px] overflow-clip relative shrink-0 w-full" data-name="Main">
      <BackgroundVerticalBorder />
      <Background />
    </div>
  );
}

export default function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <Header />
      <Main />
    </div>
  );
}