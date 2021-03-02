import React from 'react';

export default function ReportCover() {
  return (
    <svg
      className="report-cover"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 415.338 513.781"
    >
      <defs>
        <filter
          id="shadow"
          x="42.772"
          y="1.215"
          width="372.566"
          height="512.566"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#5557f6" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="page"
          x="39.555"
          y="24.998"
          width="314"
          height="426"
          filterUnits="userSpaceOnUse"
        >
          <feOffset input="SourceAlpha" />
          <feGaussianBlur stdDeviation="5" result="blur-2" />
          <feFlood floodOpacity="0.161" />
          <feComposite operator="in" in2="blur-2" />
          <feComposite in="SourceGraphic" />
        </filter>
        <linearGradient
          id="linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#1cd8b4" />
          <stop offset="1" stopColor="#5557f6" />
        </linearGradient>
        <filter
          id="Ellipse_290"
          x="147.555"
          y="97.998"
          width="43"
          height="43"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur-3" />
          <feFlood floodOpacity="0.161" />
          <feComposite operator="in" in2="blur-3" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g
        id="Group_2358"
        data-name="Group 2358"
        transform="translate(-379.445 -188.002)"
      >
        <g id="report_areas" data-name="report areas">
          <g className="report-cover__report-area" id="Background">
            <g
              transform="matrix(1, 0, 0, 1, 379.44, 188)"
              filter="url(#shadow)"
            >
              <rect
                id="shadow-2"
                data-name="shadow"
                width="251"
                height="391"
                transform="translate(103.56 59)"
                fill="none"
                opacity="0.184"
              />
            </g>
            <rect
              id="page_2"
              data-name="page 2"
              width="285"
              height="397"
              transform="matrix(0.999, 0.035, -0.035, 0.999, 454.014, 228)"
              fill="#efeff2"
            />
            <g transform="matrix(1, 0, 0, 1, 379.44, 188)" filter="url(#page)">
              <rect
                id="page-2"
                data-name="page"
                width="284"
                height="396"
                transform="translate(54.56 40)"
                fill="#fff"
              />
            </g>
            <path
              id="bg-_gradient"
              data-name="bg- gradient"
              d="M53.783-42.2,335.174-1.648,280.393,390.466-.992,350.92Z"
              transform="translate(386.301 276.443) rotate(-8)"
              opacity="0.041"
              fill="url(#linear-gradient)"
            />
          </g>
          <g className="report-cover__report-area" id="Organisational_Maturity">
            <g
              id="curreent_item"
              data-name="curreent item"
              transform="translate(466 292)"
              fill="#7cc4f5"
            >
              <path
                d="M 50 98.5 C 43.45188522338867 98.5 37.10042953491211 97.21787261962891 31.12207221984863 94.68923950195312 C 25.34691429138184 92.24655914306641 20.15997123718262 88.74931335449219 15.70532894134521 84.29468536376953 C 11.2506856918335 79.84004211425781 7.753442764282227 74.65309906005859 5.310757160186768 68.8779296875 C 2.782128572463989 62.89957046508789 1.5 56.54811477661133 1.5 50 C 1.5 43.45188522338867 2.782128572463989 37.10042953491211 5.310757160186768 31.12207221984863 C 7.753442764282227 25.34691429138184 11.2506856918335 20.15997123718262 15.70532894134521 15.70532894134521 C 20.15997123718262 11.2506856918335 25.34691429138184 7.753442764282227 31.12207221984863 5.310757160186768 C 37.10042953491211 2.782128572463989 43.45188522338867 1.5 50 1.5 C 56.54811477661133 1.5 62.89957046508789 2.782128572463989 68.8779296875 5.310757160186768 C 74.65309906005859 7.753442764282227 79.84004211425781 11.2506856918335 84.29468536376953 15.70532894134521 C 88.74931335449219 20.15997123718262 92.24655914306641 25.34691429138184 94.68923950195312 31.12207221984863 C 97.21787261962891 37.10042953491211 98.5 43.45188522338867 98.5 50 C 98.5 56.54811477661133 97.21787261962891 62.89957046508789 94.68923950195312 68.8779296875 C 92.24655914306641 74.65309906005859 88.74931335449219 79.84004211425781 84.29468536376953 84.29468536376953 C 79.84004211425781 88.74931335449219 74.65309906005859 92.24655914306641 68.8779296875 94.68923950195312 C 62.89957046508789 97.21787261962891 56.54811477661133 98.5 50 98.5 Z"
                stroke="none"
              />
              <path
                d="M 50 3 C 43.65372467041016 3 37.49886322021484 4.242263793945312 31.70639801025391 6.6922607421875 C 26.11003112792969 9.059326171875 21.08335113525391 12.44861602783203 16.76598358154297 16.76598358154297 C 12.44861602783203 21.08335113525391 9.059326171875 26.11003112792969 6.6922607421875 31.70639801025391 C 4.242263793945312 37.49886322021484 3 43.65372467041016 3 50 C 3 56.34627532958984 4.242263793945312 62.50113677978516 6.6922607421875 68.29360198974609 C 9.059326171875 73.88996887207031 12.44861602783203 78.91664886474609 16.76598358154297 83.23401641845703 C 21.08335113525391 87.55138397216797 26.11003112792969 90.940673828125 31.70639801025391 93.3077392578125 C 37.49886322021484 95.75773620605469 43.65372467041016 97 50 97 C 56.34627532958984 97 62.50113677978516 95.75773620605469 68.29360198974609 93.3077392578125 C 73.88996887207031 90.940673828125 78.91664886474609 87.55138397216797 83.23401641845703 83.23401641845703 C 87.55138397216797 78.91664886474609 90.940673828125 73.88996887207031 93.3077392578125 68.29360198974609 C 95.75773620605469 62.50113677978516 97 56.34627532958984 97 50 C 97 43.65372467041016 95.75773620605469 37.49886322021484 93.3077392578125 31.70639801025391 C 90.940673828125 26.11003112792969 87.55138397216797 21.08335113525391 83.23401641845703 16.76598358154297 C 78.91664886474609 12.44861602783203 73.88996887207031 9.059326171875 68.29360198974609 6.6922607421875 C 62.50113677978516 4.242263793945312 56.34627532958984 3 50 3 M 50 0 C 77.61422729492188 0 100 22.38577270507812 100 50 C 100 77.61422729492188 77.61422729492188 100 50 100 C 22.38577270507812 100 0 77.61422729492188 0 50 C 0 22.38577270507812 22.38577270507812 0 50 0 Z"
                stroke="none"
                fill="#7cc4f5"
              />
            </g>
            <text
              id="Organisational_Maturity-2"
              data-name="Organisational
Maturity"
              transform="translate(516 354.609)"
              fill="#fff"
              fontSize="10"
              fontFamily="ProximaNova-Bold, Proxima Nova"
              fontWeight="700"
              letterSpacing="0.003em"
            >
              <tspan x="-33.425" y="0">
                Organisational
              </tspan>
              <tspan x="-19" y="12">
                Maturity
              </tspan>
            </text>
            <g id="icon-oranisational-maturity">
              <line
                id="Line_1"
                data-name="Line 1"
                y1="26.262"
                transform="translate(517.047 312.195)"
                fill="none"
                stroke="#fff"
                strokeWidth="1"
              />
              <g
                id="Ellipse_1"
                data-name="Ellipse 1"
                transform="translate(515.945 331.734) rotate(-30)"
                fill="none"
                stroke="#fff"
                strokeWidth="1"
              >
                <ellipse
                  cx="4.485"
                  cy="2.242"
                  rx="4.485"
                  ry="2.242"
                  stroke="none"
                />
                <ellipse
                  cx="4.485"
                  cy="2.242"
                  rx="3.985"
                  ry="1.742"
                  fill="none"
                />
              </g>
              <g
                id="Path_853"
                data-name="Path 853"
                transform="translate(516.254 331.436) rotate(-150)"
                fill="none"
              >
                <path
                  d="M4.485,0C6.962,0,8.969,1,8.969,2.243S6.962,4.485,4.485,4.485,0,3.481,0,2.243,2.008,0,4.485,0Z"
                  stroke="none"
                />
                <path
                  d="M 4.484747409820557 1.000000476837158 C 3.454217433929443 1.000000476837158 2.461377620697021 1.200920581817627 1.760787487030029 1.551230430603027 C 1.20260763168335 1.830330610275269 0.999997615814209 2.117550611495972 0.999997615814209 2.24250054359436 C 0.999997615814209 2.367450475692749 1.20260763168335 2.654670715332031 1.760787487030029 2.933770656585693 C 2.461377620697021 3.284080505371094 3.454217433929443 3.485000610351562 4.484747409820557 3.485000610351562 C 5.51527738571167 3.485000610351562 6.50811767578125 3.284080505371094 7.208707332611084 2.933770656585693 C 7.766887664794922 2.654670715332031 7.969497203826904 2.367450475692749 7.969497203826904 2.24250054359436 C 7.969497203826904 2.117550611495972 7.766887664794922 1.830330610275269 7.208707332611084 1.551230430603027 C 6.50811767578125 1.200920581817627 5.51527738571167 1.000000476837158 4.484747409820557 1.000000476837158 M 4.484747409820557 4.76837158203125e-07 C 6.961607456207275 4.76837158203125e-07 8.969497680664062 1.004000425338745 8.969497680664062 2.24250054359436 C 8.969497680664062 3.481000423431396 6.961607456207275 4.485000610351562 4.484747409820557 4.485000610351562 C 2.007887363433838 4.485000610351562 -2.86102294921875e-06 3.481000423431396 -2.86102294921875e-06 2.24250054359436 C -2.86102294921875e-06 1.004000425338745 2.007887363433838 4.76837158203125e-07 4.484747409820557 4.76837158203125e-07 Z"
                  stroke="none"
                  fill="#fff"
                />
              </g>
              <g
                id="Path_854"
                data-name="Path 854"
                transform="translate(515.945 323.367) rotate(-30)"
                fill="none"
              >
                <path
                  d="M4.485,0C6.961,0,8.969,1,8.969,2.242S6.961,4.485,4.485,4.485,0,3.481,0,2.242,2.008,0,4.485,0Z"
                  stroke="none"
                />
                <path
                  d="M 4.484579563140869 0.999997615814209 C 3.454089641571045 0.999997615814209 2.461279392242432 1.200897693634033 1.760719776153564 1.551177501678467 C 1.202589511871338 1.830237627029419 0.9999995231628418 2.117357492446899 0.9999995231628418 2.242267608642578 C 0.9999995231628418 2.367177724838257 1.202589511871338 2.654297590255737 1.760719776153564 2.933357715606689 C 2.461279392242432 3.283637523651123 3.454089641571045 3.484537601470947 4.484579563140869 3.484537601470947 C 5.515069484710693 3.484537601470947 6.507879257202148 3.283637523651123 7.208439826965332 2.933357715606689 C 7.7665696144104 2.654297590255737 7.969159603118896 2.367177724838257 7.969159603118896 2.242267608642578 C 7.969159603118896 2.117357492446899 7.7665696144104 1.830237627029419 7.208439826965332 1.551177501678467 C 6.507879257202148 1.200897693634033 5.515069484710693 0.999997615814209 4.484579563140869 0.999997615814209 M 4.484579563140869 -2.384185791015625e-06 C 6.961339473724365 -2.384185791015625e-06 8.969159126281738 1.003897666931152 8.969159126281738 2.242267608642578 C 8.969159126281738 3.480637550354004 6.961339473724365 4.484537601470947 4.484579563140869 4.484537601470947 C 2.007819652557373 4.484537601470947 0 3.480637550354004 0 2.242267608642578 C 0 1.003897666931152 2.007819652557373 -2.384185791015625e-06 4.484579563140869 -2.384185791015625e-06 Z"
                  stroke="none"
                  fill="#fff"
                />
              </g>
              <path
                id="Path_3"
                data-name="Path 3"
                d="M1685.245-18654.428l4.23-4.23,4.229,4.23"
                transform="translate(-1172.428 18970.658)"
                fill="none"
                stroke="#fff"
                strokeWidth="1"
              />
            </g>
            <g id="Icon-tick" transform="translate(543 300)">
              <g filter="url(#Ellipse_290)" transform="translate(-163 -113)">
                <circle
                  id="Ellipse_290-2"
                  data-name="Ellipse 290"
                  cx="12.5"
                  cy="12.5"
                  r="12.5"
                  transform="translate(156.56 104)"
                  fill="#fff"
                />
              </g>
              <path
                id="Path_443"
                data-name="Path 443"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
              <path
                id="Path_855"
                data-name="Path 855"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
            </g>
          </g>
          <g className="report-cover__report-area" id="Team_Effectiveness">
            <g
              id="background-2"
              data-name="background"
              transform="translate(586 292)"
              fill="#fff"
              stroke="#7cc4f5"
              strokeWidth="3"
            >
              <circle cx="50" cy="50" r="50" stroke="none" />
              <circle cx="50" cy="50" r="48.5" fill="none" />
            </g>
            <text
              id="Team_Effectiveness"
              data-name="Team
Effectiveness"
              transform="translate(636 354.609)"
              fill="#313135"
              fontSize="10"
              fontFamily="ProximaNova-Regular, Proxima Nova"
              letterSpacing="0.003em"
            >
              <tspan x="-11.815" y="0">
                Team
              </tspan>
              <tspan x="-29.245" y="12">
                Effectiveness
              </tspan>
            </text>
            <g
              id="Icon_Cross_Functional_Teams"
              data-name="Icon Cross Functional Teams"
              transform="translate(-365.49 26)"
            >
              <path
                id="Path_828"
                data-name="Path 828"
                d="M553.891,611.233a.643.643,0,0,0-.881.23,10.154,10.154,0,0,1-3.675,3.655.644.644,0,0,0,.644,1.115,11.456,11.456,0,0,0,4.143-4.12A.644.644,0,0,0,553.891,611.233Z"
                transform="translate(457.526 -308.363)"
                fill="#62626a"
              />
              <path
                id="Path_829"
                data-name="Path 829"
                d="M549.321,595.188a10.147,10.147,0,0,1,3.741,3.753.644.644,0,1,0,1.118-.638,11.439,11.439,0,0,0-4.218-4.231.644.644,0,0,0-.642,1.117Z"
                transform="translate(457.528 -305.93)"
                fill="#62626a"
              />
              <path
                id="Path_830"
                data-name="Path 830"
                d="M532.212,599.188a.628.628,0,0,0,.318.085.643.643,0,0,0,.56-.325,10.139,10.139,0,0,1,3.75-3.763.644.644,0,1,0-.642-1.116,11.415,11.415,0,0,0-4.226,4.242A.642.642,0,0,0,532.212,599.188Z"
                transform="translate(459.954 -305.93)"
                fill="#62626a"
              />
              <path
                id="Path_831"
                data-name="Path 831"
                d="M536.853,615.129a10.147,10.147,0,0,1-3.7-3.674.644.644,0,0,0-1.111.651,11.437,11.437,0,0,0,4.169,4.139.644.644,0,0,0,.642-1.116Z"
                transform="translate(459.944 -308.361)"
                fill="#62626a"
              />
              <path
                id="Subtraction_3"
                data-name="Subtraction 3"
                d="M7.879,3.943H0a3.94,3.94,0,1,1,7.879,0Z"
                transform="translate(997.752 286.441)"
                fill="#62626a"
              />
              <circle
                id="Ellipse_286"
                data-name="Ellipse 286"
                cx="1.971"
                cy="1.971"
                r="1.971"
                transform="translate(999.721 282.5)"
                fill="#62626a"
              />
              <path
                id="Subtraction_4"
                data-name="Subtraction 4"
                d="M7.879,3.943H0a3.94,3.94,0,1,1,7.879,0Z"
                transform="translate(997.752 309.361)"
                fill="#62626a"
              />
              <circle
                id="Ellipse_287"
                data-name="Ellipse 287"
                cx="1.971"
                cy="1.971"
                r="1.971"
                transform="translate(999.721 305.422)"
                fill="#62626a"
              />
              <path
                id="Subtraction_5"
                data-name="Subtraction 5"
                d="M7.879,3.943H0a3.94,3.94,0,1,1,7.879,0Z"
                transform="translate(1009.226 297.939)"
                fill="#62626a"
              />
              <circle
                id="Ellipse_288"
                data-name="Ellipse 288"
                cx="1.971"
                cy="1.971"
                r="1.971"
                transform="translate(1011.195 293.998)"
                fill="#62626a"
              />
              <path
                id="Subtraction_6"
                data-name="Subtraction 6"
                d="M7.879,3.943H0a3.94,3.94,0,1,1,7.879,0Z"
                transform="translate(986.49 297.939)"
                fill="#62626a"
              />
              <circle
                id="Ellipse_289"
                data-name="Ellipse 289"
                cx="1.971"
                cy="1.971"
                r="1.971"
                transform="translate(988.458 293.998)"
                fill="#62626a"
              />
            </g>
            <g id="Icon-tick" transform="translate(665 300)">
              <g filter="url(#Ellipse_290)" transform="translate(-163 -113)">
                <circle
                  id="Ellipse_290-2"
                  data-name="Ellipse 290"
                  cx="12.5"
                  cy="12.5"
                  r="12.5"
                  transform="translate(156.56 104)"
                  fill="#fff"
                />
              </g>
              <path
                id="Path_443"
                data-name="Path 443"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
              <path
                id="Path_855"
                data-name="Path 855"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
            </g>
          </g>
          <g className="report-cover__report-area" id="Continuous_Delivery">
            <circle
              id="Ellipse_5"
              data-name="Ellipse 5"
              cx="50"
              cy="50"
              r="50"
              transform="translate(463 407)"
              fill="#fff"
            />
            <text
              id="Continuous_Delivery-2"
              data-name="Continuous
Delivery"
              transform="translate(513 469.609)"
              fill="#313135"
              fontSize="10"
              fontFamily="ProximaNova-Regular, Proxima Nova"
              letterSpacing="0.003em"
              opacity="0.303"
            >
              <tspan x="-25.185" y="0">
                Continuous
              </tspan>
              <tspan x="-18.035" y="12">
                Delivery
              </tspan>
            </text>
            <g
              id="Group_3"
              data-name="Group 3"
              transform="translate(-304 347.175)"
              opacity="0.301"
            >
              <path
                id="Path_833"
                data-name="Path 833"
                d="M540.158,656.752a7.925,7.925,0,0,1,0-15.835,7.645,7.645,0,0,1,7.317,5.933h-1.4l2.291,3.969,2.292-3.969H548.8a8.956,8.956,0,0,0-8.646-7.225,9.216,9.216,0,0,0,0,18.419,8.573,8.573,0,0,0,5.116-1.69l-.765-1.04A7.3,7.3,0,0,1,540.158,656.752Z"
                transform="translate(270.7 -555.625)"
                fill="#62626a"
              />
              <path
                id="Path_834"
                data-name="Path 834"
                d="M553.916,639.717a8.5,8.5,0,0,0-5.061,1.667l.765,1.041a7.209,7.209,0,0,1,4.3-1.416,7.846,7.846,0,0,1,0,15.676,7.565,7.565,0,0,1-7.237-5.853h1.393l-2.291-3.969-2.292,3.969h1.861a8.878,8.878,0,0,0,8.567,7.145,9.137,9.137,0,0,0,0-18.26Z"
                transform="translate(269.01 -555.717)"
                fill="#62626a"
              />
            </g>
            <g id="Icon-tick" transform="translate(543 415)">
              <g filter="url(#Ellipse_290)" transform="translate(-163 -113)">
                <circle
                  id="Ellipse_290-2"
                  data-name="Ellipse 290"
                  cx="12.5"
                  cy="12.5"
                  r="12.5"
                  transform="translate(156.56 104)"
                  fill="#fff"
                />
              </g>
              <path
                id="Path_443"
                data-name="Path 443"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
              <path
                id="Path_855"
                data-name="Path 855"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
            </g>
          </g>
          <g className="report-cover__report-area" id="XP_practices">
            <circle
              id="Ellipse_6"
              data-name="Ellipse 6"
              cx="50"
              cy="50"
              r="50"
              transform="translate(586 407)"
              fill="#fff"
            />
            <text
              id="XP_Practices-2"
              data-name="XP
Practices"
              transform="translate(636 469.609)"
              fill="#313135"
              fontSize="10"
              fontFamily="ProximaNova-Regular, Proxima Nova"
              letterSpacing="0.003em"
              opacity="0.303"
            >
              <tspan x="-6.21" y="0">
                XP
              </tspan>
              <tspan x="-20.04" y="12">
                Practices
              </tspan>
            </text>
            <path
              id="Path_4"
              data-name="Path 4"
              d="M597.371,613.34a.519.519,0,0,0,0,1.038,10.759,10.759,0,1,1-3.443,20.943c-.267-3.006.183-5.086,1.38-6.344,1.116-1.174,2.949-1.736,5.721-1.742l-.51.368a.519.519,0,1,0,.607.842l1.769-1.276a.437.437,0,0,0,.073-.061.5.5,0,0,0,.1-.146.519.519,0,0,0-.1-.587.439.439,0,0,0-.073-.061l-1.769-1.276a.519.519,0,1,0-.607.842l.441.318c-3.039.019-5.092.684-6.4,2.064-1.339,1.407-1.89,3.588-1.7,6.631a10.793,10.793,0,0,1-3.3-2.376c-.529-5.073,1.963-7.985,7.822-9.079l-.316.308a.519.519,0,1,0,.723.745l1.564-1.521a.455.455,0,0,0,.064-.072.5.5,0,0,0,.08-.158.511.511,0,0,0,.017-.226.514.514,0,0,0-.2-.34.49.49,0,0,0-.082-.051l-1.938-1a.519.519,0,1,0-.477.922l.647.335c-5.931,1.055-8.948,4.007-9,8.788a10.756,10.756,0,0,1-1.223-2.439c.051-5.11,3.092-7.044,6.211-8.436l-.328.618a.519.519,0,0,0,.215.7.512.512,0,0,0,.243.061.52.52,0,0,0,.459-.275l1-1.88a.51.51,0,0,0,.06-.491.242.242,0,0,0-.019-.027.09.09,0,0,0,0-.014,14.567,14.567,0,0,1-.118-.146c-.01-.008-.014-.021-.024-.03a.532.532,0,0,0-.157-.086.489.489,0,0,0-.093-.022l-2.151-.361a.511.511,0,0,0-.6.426.518.518,0,0,0,.426.6l.457.077c-2.558,1.164-5.169,2.776-6.182,6.164-.006-.155-.023-.307-.023-.463a10.749,10.749,0,0,1,3.011-7.465l-.062.707a.519.519,0,1,0,1.034.091l.192-2.185a.455.455,0,0,0-.01-.092.668.668,0,0,0,0-.074c0-.006-.006-.01-.008-.016a.5.5,0,0,0-.052-.111.545.545,0,0,0-.038-.069.493.493,0,0,0-.084-.077.525.525,0,0,0-.064-.053.59.59,0,0,0-.1-.037.571.571,0,0,0-.095-.028c-.008,0-.013-.006-.021-.006a.6.6,0,0,0-.093.01.523.523,0,0,0-.073,0l-2.133.508a.519.519,0,1,0,.24,1.01l.441-.105a11.724,11.724,0,0,0-2.482,11.793.489.489,0,0,0,.062.169,11.778,11.778,0,0,0,2.318,3.884.51.51,0,0,0,.2.216,11.79,11.79,0,1,0,8.58-19.869Z"
              transform="translate(38.426 -184.752)"
              fill="#62626a"
              opacity="0.303"
            />
            <g id="Icon-tick" transform="translate(665 415)">
              <g filter="url(#Ellipse_290)" transform="translate(-163 -113)">
                <circle
                  id="Ellipse_290-2"
                  data-name="Ellipse 290"
                  cx="12.5"
                  cy="12.5"
                  r="12.5"
                  transform="translate(156.56 104)"
                  fill="#fff"
                />
              </g>
              <path
                id="Path_443"
                data-name="Path 443"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
              <path
                id="Path_855"
                data-name="Path 855"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
            </g>
          </g>
          <g className="report-cover__report-area" id="Culture">
            <circle
              id="Ellipse_7"
              data-name="Ellipse 7"
              cx="50"
              cy="50"
              r="50"
              transform="translate(521 506)"
              fill="#fff"
            />
            <g
              id="Group_4"
              data-name="Group 4"
              transform="translate(-369 35)"
              opacity="0.303"
            >
              <text
                id="Organisational_Culture"
                data-name="Organisational
Culture"
                transform="translate(940 536.055)"
                fill="#313135"
                fontSize="10"
                fontFamily="ProximaNova-Regular, Proxima Nova"
                letterSpacing="0.003em"
              >
                <tspan x="-32.015" y="0">
                  Organisational
                </tspan>
                <tspan x="-16.04" y="12">
                  Culture
                </tspan>
              </text>
              <g
                id="Group_2357"
                data-name="Group 2357"
                transform="translate(-275.287 413.311)"
              >
                <path
                  id="Path_847"
                  data-name="Path 847"
                  d="M2187.92-18644.127v-12.426s-.131-6.746,7.847-6.746a7.85,7.85,0,0,1,8.312,7.406l2.527,5.734h-2.527v4.848s.115,1.895-2.269,1.895"
                  transform="translate(-985.47 18751.105)"
                  fill="none"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                />
                <path
                  id="Path_848"
                  data-name="Path 848"
                  d="M2206.607-18644.127v-12.426s.13-6.746-7.848-6.746a7.851,7.851,0,0,0-8.312,7.406l-2.527,5.734h2.527v4.848s-.114,1.895,2.269,1.895"
                  transform="translate(-978.484 18744.994)"
                  fill="none"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                />
              </g>
            </g>
            <g id="Icon-tick" transform="translate(602 517)">
              <g filter="url(#Ellipse_290)" transform="translate(-163 -113)">
                <circle
                  id="Ellipse_290-2"
                  data-name="Ellipse 290"
                  cx="12.5"
                  cy="12.5"
                  r="12.5"
                  transform="translate(156.56 104)"
                  fill="#fff"
                />
              </g>
              <path
                id="Path_443"
                data-name="Path 443"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
              <path
                id="Path_855"
                data-name="Path 855"
                d="M846.681-5361.842l3.77,3.641,8.23-8.321"
                transform="translate(-846.681 5366.522)"
                stroke="#7cc4f5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="none"
              />
            </g>
          </g>
          <g id="Header" transform="translate(-369.313 35)">
            <text
              id="Report_Areas-2"
              data-name="Report Areas"
              transform="translate(992 229)"
              fill="#62626a"
              fontSize="13"
              fontFamily="ProximaNova-Bold, Proxima Nova"
              fontWeight="700"
              letterSpacing="0.003em"
            >
              <tspan x="0" y="0">
                Report Areas
              </tspan>
            </text>
            <g
              id="Compas_Logo"
              data-name="Compas Logo"
              transform="translate(694.738 17.375)"
            >
              <g
                id="Group_2322"
                data-name="Group 2322"
                transform="translate(131.697 208.835)"
              >
                <path
                  id="Path_813"
                  data-name="Path 813"
                  d="M164.206,306.247a9.19,9.19,0,0,1-6.4-7.024c-.036-.188-.068-.4-.1-.636l.474-.057c.027.228.057.425.091.6a8.707,8.707,0,0,0,6.067,6.656Z"
                  transform="translate(-157.707 -298.53)"
                  fill="#0c0c0d"
                />
              </g>
              <g
                id="Group_2323"
                data-name="Group 2323"
                transform="translate(127.576 194.625)"
              >
                <path
                  id="Path_814"
                  data-name="Path 814"
                  d="M140.748,220.969a13.172,13.172,0,1,1,8.835-22.939l.275.249-4.755,2.054-.1-.059a8.642,8.642,0,0,0-12.768,6.052c-.025.145-.047.3-.067.489l-.475-.053c.022-.193.045-.362.071-.516a9.12,9.12,0,0,1,13.371-6.446l3.85-1.663a12.693,12.693,0,1,0,1.409,17.916l-3.06-1.946a9.156,9.156,0,0,1-6.455,2.806l-.006-.478a8.559,8.559,0,0,0,6.247-2.8l.135-.147,3.854,2.45-.171.209A13.134,13.134,0,0,1,140.748,220.969Z"
                  transform="translate(-127.576 -194.625)"
                  fill="#0c0c0d"
                />
              </g>
              <g
                id="Group_2324"
                data-name="Group 2324"
                transform="translate(131.358 196.932)"
              >
                <path
                  id="Path_815"
                  data-name="Path 815"
                  d="M178.816,212.254l-15.633,19.472-.539-6.786-.015-.19-.18-.063-6.428-2.239,22.795-10.195m.984-.76-24.569,10.988,7.122,2.481.6,7.518,16.85-20.987Z"
                  transform="translate(-155.231 -211.494)"
                  fill="#0c0c0d"
                />
              </g>
              <g
                id="Group_2326"
                data-name="Group 2326"
                transform="translate(138.516 197.252)"
              >
                <g
                  id="Group_2325"
                  data-name="Group 2325"
                  transform="translate(0 0)"
                >
                  <rect
                    id="Rectangle_1308"
                    data-name="Rectangle 1308"
                    width="21.173"
                    height="0.292"
                    transform="translate(0 12.932) rotate(-37.645)"
                    fill="#0c0c0d"
                  />
                </g>
              </g>
              <g
                id="Group_2329"
                data-name="Group 2329"
                transform="translate(138.561 198.007)"
              >
                <g
                  id="Group_2328"
                  data-name="Group 2328"
                  transform="translate(0 0)"
                >
                  <g
                    id="Group_2327"
                    data-name="Group 2327"
                    transform="translate(0)"
                  >
                    <rect
                      id="Rectangle_1309"
                      data-name="Rectangle 1309"
                      width="0.146"
                      height="7.137"
                      transform="translate(0 12.29) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1310"
                      data-name="Rectangle 1310"
                      width="0.146"
                      height="6.859"
                      transform="translate(0.663 11.778) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1311"
                      data-name="Rectangle 1311"
                      width="0.146"
                      height="6.582"
                      transform="translate(1.325 11.267) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1312"
                      data-name="Rectangle 1312"
                      width="0.146"
                      height="6.304"
                      transform="translate(1.988 10.755) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1313"
                      data-name="Rectangle 1313"
                      width="0.146"
                      height="6.027"
                      transform="translate(2.651 10.243) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1314"
                      data-name="Rectangle 1314"
                      width="0.146"
                      height="5.749"
                      transform="translate(3.314 9.732) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1315"
                      data-name="Rectangle 1315"
                      width="0.146"
                      height="5.472"
                      transform="translate(3.976 9.22) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1316"
                      data-name="Rectangle 1316"
                      width="0.146"
                      height="5.194"
                      transform="translate(4.639 8.709) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1317"
                      data-name="Rectangle 1317"
                      width="0.146"
                      height="4.917"
                      transform="translate(5.302 8.197) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1318"
                      data-name="Rectangle 1318"
                      width="0.146"
                      height="4.639"
                      transform="translate(5.964 7.686) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1319"
                      data-name="Rectangle 1319"
                      width="0.146"
                      height="4.362"
                      transform="translate(6.627 7.174) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1320"
                      data-name="Rectangle 1320"
                      width="0.146"
                      height="4.084"
                      transform="matrix(0.997, -0.079, 0.079, 0.997, 7.29, 6.662)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1321"
                      data-name="Rectangle 1321"
                      width="0.146"
                      height="3.807"
                      transform="matrix(0.997, -0.079, 0.079, 0.997, 7.952, 6.151)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1322"
                      data-name="Rectangle 1322"
                      width="0.146"
                      height="3.529"
                      transform="translate(8.615 5.639) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1323"
                      data-name="Rectangle 1323"
                      width="0.146"
                      height="3.252"
                      transform="translate(9.278 5.128) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1324"
                      data-name="Rectangle 1324"
                      width="0.146"
                      height="2.974"
                      transform="matrix(0.997, -0.079, 0.079, 0.997, 9.941, 4.616)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1325"
                      data-name="Rectangle 1325"
                      width="0.146"
                      height="2.697"
                      transform="translate(10.603 4.104) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1326"
                      data-name="Rectangle 1326"
                      width="0.146"
                      height="2.419"
                      transform="translate(11.266 3.593) rotate(-4.54)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1327"
                      data-name="Rectangle 1327"
                      width="0.146"
                      height="2.142"
                      transform="matrix(0.997, -0.079, 0.079, 0.997, 11.929, 3.081)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1328"
                      data-name="Rectangle 1328"
                      width="0.146"
                      height="1.864"
                      transform="translate(12.591 2.57) rotate(-4.541)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1329"
                      data-name="Rectangle 1329"
                      width="0.146"
                      height="1.587"
                      transform="translate(13.254 2.058) rotate(-4.541)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1330"
                      data-name="Rectangle 1330"
                      width="0.146"
                      height="1.309"
                      transform="translate(13.917 1.546) rotate(-4.541)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1331"
                      data-name="Rectangle 1331"
                      width="0.146"
                      height="1.032"
                      transform="matrix(0.997, -0.079, 0.079, 0.997, 14.579, 1.035)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1332"
                      data-name="Rectangle 1332"
                      width="0.146"
                      height="0.754"
                      transform="translate(15.242 0.523) rotate(-4.542)"
                      fill="#0c0c0d"
                    />
                    <rect
                      id="Rectangle_1333"
                      data-name="Rectangle 1333"
                      width="0.146"
                      height="0.477"
                      transform="translate(15.905 0.012) rotate(-4.543)"
                      fill="#0c0c0d"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
