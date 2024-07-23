import React from "react";

function CardAchivements() {
    return (
        <div className="flex flex-col text-center items-center bg-[#EBF4FF] py-8 rounded-[8px] my-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="67"
                height="67"
                viewBox="0 0 67 67"
                fill="none"
            >
                <g clip-path="url(#clip0_1_208)">
                    <path
                        d="M14.6928 5.94553C16.0194 5.16399 17.3459 4.36807 18.689 3.60533C22.1203 1.65535 25.8654 0.705781 29.7566 0.41837C35.8144 -0.0381733 41.6378 0.93129 47.1284 3.62412C47.5208 3.81647 47.8967 4.04087 48.2803 4.2509L48.225 4.37913C48.0968 4.32165 47.9663 4.26859 47.8403 4.20669C42.7785 1.67525 37.4105 0.588606 31.7928 1.00314C21.9687 1.72941 14.139 6.10471 8.4372 14.1776C5.65036 18.0951 3.86266 22.6341 3.22951 27.3997C2.58837 32.1144 2.88572 36.7959 4.6511 41.211C7.58049 48.5279 12.105 54.5934 19.3865 58.1816C22.7094 59.8268 26.2926 60.883 29.9766 61.3033C36.9606 62.0959 43.4628 60.5207 49.451 56.8529C50.1485 56.4262 50.7653 55.8502 51.3688 55.2898C52.6953 54.0627 54.0362 52.8579 55.2711 51.5456C58.4447 48.1807 60.2653 44.125 61.1155 39.6159C61.9058 35.4229 61.8162 31.2267 60.9972 27.0471C60.9153 26.6304 60.6059 26.2644 60.4776 25.851C60.0354 24.414 59.6596 22.9493 59.1864 21.52C58.2093 18.5652 56.7468 15.848 55.0223 13.2668C54.8996 13.0833 54.7858 12.8932 54.6718 12.7053C54.6465 12.6544 54.6255 12.6015 54.6089 12.5472C55.4755 13.0159 57.7129 15.9232 59.0085 18.2346C60.1952 20.3558 61.1132 22.6165 61.7411 24.9645C62.3745 27.3158 62.6918 29.7178 62.8609 32.1398C63.0466 26.9598 61.6914 22.1567 59.265 17.6145C63.4501 23.5727 66.8051 35.6683 60.3914 48.173C62.3613 46.1965 64.4815 38.0561 64.3654 32.9181C64.2383 27.465 62.8952 22.3457 60.0763 17.6322L60.2101 17.5669C60.3206 17.7316 60.4422 17.8986 60.555 18.06C60.6678 18.2213 60.7761 18.3916 60.8867 18.5674C62.4254 20.9628 63.7696 23.4633 64.4561 26.2401C65.1812 29.1761 65.6388 32.1597 65.4509 35.204C65.263 38.328 64.3676 41.2784 63.2146 44.158C60.6998 50.4369 56.7833 55.6203 51.1809 59.4772C51.0208 59.5928 50.8437 59.6827 50.6558 59.7436C53.3896 57.4836 55.8035 54.8626 57.8312 51.9525C57.6632 52.1411 57.4959 52.331 57.3293 52.5218C57.1469 52.7296 56.9756 52.9474 56.7833 53.1452C55.0765 54.9006 53.4338 56.7235 51.6408 58.3861C49.326 60.5328 46.5492 61.9235 43.538 62.8576C43.2771 62.9383 43.0184 63.0278 42.7587 63.1129L42.8128 63.2798L48.3212 61.4957C47.8702 61.7322 47.533 61.9168 47.1892 62.0882C46.8266 62.2673 46.4629 62.4453 46.0915 62.6044C41.1846 64.7136 36.0586 65.409 30.7547 65.0032C29.4183 64.9015 28.0619 64.9667 26.7387 64.7821C25.5019 64.6095 24.2842 64.32 23.1018 63.9177C21.573 63.4003 20.1028 62.715 18.595 62.1335C14.5282 60.5638 11.2936 57.8223 8.66049 54.4883C6.49274 51.7425 4.6323 48.7401 3.27926 45.4504C-1.55811 33.6996 0.736763 20.2797 9.24859 10.858C9.39639 10.6735 9.53224 10.4796 9.65534 10.2777C10.5166 9.48183 11.3589 8.66379 12.2454 7.89883C13.0358 7.21788 13.876 6.59442 14.6928 5.94553ZM38.799 64.0801C38.0859 64.1288 37.3708 64.1609 36.6589 64.2294C32.5113 64.6251 28.4356 64.2538 24.3964 63.2268C20.8059 62.3137 17.6687 60.4489 14.4596 58.7188C5.63603 51.7888 1.59347 42.606 1.62553 31.5042C1.62553 30.6641 1.70844 29.8228 1.75266 28.9816L1.62111 28.9739L1.32485 33.4144H1.30274C1.36539 31.7474 1.42876 30.0808 1.49288 28.4146C0.811218 33.1654 1.21255 38.009 2.66685 42.5828C4.11717 47.2257 6.53585 51.3157 9.81347 54.8984C13.0294 58.4403 17.0288 61.1814 21.4924 62.9029L19.7855 62.0749L19.8353 61.939C22.7709 63.3057 25.9134 64.1742 29.1342 64.5091C32.3709 64.8573 35.6131 65.0795 38.799 64.0801ZM18.2822 4.30949C12.4911 7.37817 8.06209 11.8083 4.99488 17.6001C8.17853 11.9203 12.6776 7.56499 18.2822 4.30949ZM39.2113 62.9107C36.7164 63.3661 34.2004 63.6236 31.6568 63.5385C29.1355 63.4377 26.6312 63.0791 24.183 62.4685C29.1519 63.9807 34.1562 64.225 39.2113 62.9107ZM29.2624 51.0946C29.7577 51.0549 29.9257 50.8482 29.9102 50.3275C29.8151 47.513 29.7621 44.6964 29.6891 41.8809C29.6748 41.3381 29.6305 40.7953 29.5973 40.2051L27.8994 40.5058C28.0099 42.6259 28.115 44.6986 28.2211 46.7714L28.0652 46.7935L26.1219 40.8307C25.7052 40.8971 25.3481 40.9778 24.9811 41.0032C24.5998 41.0308 24.4947 41.1978 24.5091 41.5703C24.5765 43.4108 24.6197 45.2514 24.6682 47.0974C24.6637 47.2069 24.6516 47.3158 24.6318 47.4235C24.5199 47.2878 24.4398 47.1288 24.3975 46.9582C23.8867 45.269 23.3837 43.5777 22.8498 41.8953C22.7957 41.7228 22.558 41.4752 22.4209 41.4851C21.9379 41.5172 21.4625 41.6455 20.954 41.7438C21.0336 42.0113 21.0888 42.2225 21.1585 42.4292C22.0871 45.1817 23.0164 47.9339 23.9464 50.6856C24.3798 51.9713 24.3709 51.9426 25.6808 51.7292C26.1319 51.6551 26.2026 51.475 26.1849 51.0825C26.1075 49.3359 26.0511 47.5882 25.9925 45.8406C26.0009 45.7282 26.0209 45.6171 26.0522 45.5089L26.1628 45.5011C26.7796 47.3981 27.3975 49.2961 28.042 51.2871C28.4731 51.2119 28.8667 51.1267 29.2635 51.0946H29.2624ZM13.6306 29.3641L11.7236 29.7212L12.6246 34.878C12.4526 34.7618 12.3143 34.6024 12.2233 34.4159C11.4771 33.0839 10.7365 31.7474 9.98259 30.4209C9.90193 30.2805 9.72941 30.076 9.62225 30.0892C9.06951 30.1556 8.51679 30.2827 7.95081 30.3911C8.61407 34.1429 9.26516 37.8262 9.91852 41.5271L11.8265 41.1779L10.8658 35.6816C11.007 35.7771 11.1211 35.9073 11.1975 36.0597C11.846 37.2152 12.4934 38.3711 13.1397 39.5274C13.9201 40.9269 13.9135 40.928 15.492 40.5224C15.5075 40.5224 15.5186 40.498 15.5882 40.4317C14.9361 36.7583 14.2861 33.0773 13.6306 29.3641ZM41.0452 24.5389L39.1373 24.8805C39.4423 26.637 39.7386 28.3394 40.0349 30.0417C39.8701 29.9368 39.738 29.7878 39.6534 29.6117C38.9096 28.2752 38.1711 26.9487 37.4083 25.6222C37.3188 25.4664 37.0922 25.2762 36.943 25.2906C36.4223 25.3315 35.9072 25.4531 35.3633 25.5493C36.0266 29.3022 36.6766 32.9832 37.3332 36.7009L39.2411 36.336L38.2728 30.8177C38.4319 30.9509 38.5623 31.1148 38.6564 31.2997C39.4644 32.7445 40.267 34.1937 41.0883 35.633C41.1657 35.769 41.3437 35.9569 41.4564 35.9458C41.9627 35.8927 42.4624 35.7767 43.0162 35.6739C42.3496 31.9232 41.7018 28.2531 41.0463 24.5389H41.0452ZM52.2764 22.5325C53.2647 22.3855 54.202 22.1622 55.1505 22.1246C56.8386 22.0594 57.9959 23.1615 58.3563 25.0164C58.5829 26.1816 58.5177 27.2815 57.7814 28.2818C57.6997 28.3924 57.7417 28.6622 57.819 28.8103C58.4039 29.9356 59.0129 31.0488 59.612 32.1675C59.6961 32.3244 59.7735 32.4848 59.8862 32.7081C59.2351 32.8186 58.6448 32.9512 58.0478 33.0142C57.9152 33.0286 57.7019 32.8451 57.6212 32.6992C57.0862 31.7341 56.5832 30.7525 56.0559 29.7831C55.9785 29.6415 55.8281 29.5388 55.711 29.4182L55.5473 29.5111C55.7618 30.7669 55.9752 32.0227 56.2007 33.3459L54.254 33.7151C53.5952 29.9931 52.9485 26.2998 52.2775 22.5325H52.2764ZM55.218 27.6971C55.9199 27.5865 56.4218 27.2395 56.4339 26.6094C56.4407 25.9369 56.3241 25.2688 56.0901 24.6384C55.8635 24.0304 55.2213 23.8778 54.5912 24.1387C54.7957 25.3028 55.0024 26.4745 55.2191 27.6971H55.218ZM23.8757 28.1238C24.2249 30.097 24.5633 32.0724 24.9324 34.0423C25.1026 34.9433 25.2442 35.8651 25.5603 36.7175C26.0434 38.0185 27.1831 38.6221 28.4488 38.4076C30.1943 38.1124 31.0919 36.7583 30.7868 34.8515C30.5912 33.6354 30.3723 32.4195 30.1589 31.209C29.8914 29.6913 29.6172 28.1747 29.3365 26.6027L27.3964 26.9487C27.7977 29.2126 28.1935 31.4169 28.5738 33.6244C28.692 34.312 28.7948 35.004 28.8512 35.6982C28.8855 36.1149 28.7008 36.472 28.2399 36.5549C27.7789 36.6378 27.5181 36.3592 27.3555 35.9746C27.2766 35.7885 27.2188 35.5943 27.1831 35.3954C26.8883 33.749 26.5935 32.1019 26.2988 30.4541C26.1097 29.3928 25.9196 28.3316 25.724 27.2361L23.8115 27.581C23.8403 27.8021 23.8502 27.9646 23.8757 28.1238ZM38.2242 15.2786C37.0601 15.0786 36.5793 15.3439 36.5118 16.4161C36.4157 17.9505 36.67 19.4639 37.3797 20.8534C37.6836 21.4481 38.2574 21.5929 38.8355 21.2536C38.9428 21.184 39.0338 21.0922 39.1026 20.9845C39.1715 20.8767 39.2165 20.7555 39.2345 20.629C39.2942 18.4579 39.3451 16.2846 39.3274 14.107C39.3274 13.4967 39.5573 13.3143 40.0956 13.2535C40.9546 13.1552 40.9502 13.1364 41.2652 13.9709C42.1827 16.3962 43.1009 18.8205 44.0199 21.2436C44.083 21.4116 44.1304 21.584 44.2034 21.7963L42.7664 22.0705C42.5983 21.6117 42.4137 21.1773 42.2811 20.7274C42.1871 20.4079 42.0247 20.3482 41.7151 20.3902C40.6495 20.5361 40.6484 20.5262 40.6506 21.625C40.6506 22.4319 40.6506 22.4286 39.8657 22.5834C39.47 22.6607 39.0709 22.7337 38.6829 22.8443C37.7787 23.1007 37.0502 22.8133 36.4566 22.1368C35.7126 21.289 35.3854 20.2387 35.2406 19.1632C35.0829 18.0957 35.0292 17.0154 35.0803 15.9375C35.1555 14.6298 36.0453 13.8483 37.3509 13.7266C37.7533 13.6869 38.0274 13.8018 38.0727 14.2595C38.1003 14.5801 38.1678 14.8995 38.2275 15.2786H38.2242ZM40.6274 19.2107L41.6731 19.025C41.3481 18.0843 41.0441 17.2066 40.7413 16.3278L40.6307 16.3587L40.6274 19.2107ZM42.9488 48.5898C42.8783 48.6279 42.8042 48.659 42.7277 48.6826C42.2015 48.7589 41.5736 49.0386 41.1801 48.8451C40.7865 48.6516 40.6185 47.9873 40.3631 47.5186C40.0625 46.9659 39.7873 46.4065 39.47 45.8682C39.3871 45.7255 39.1903 45.6471 39.0455 45.5454C39.009 45.7068 38.9206 45.8771 38.9449 46.0307C39.0864 46.9018 39.2422 47.7706 39.418 48.635C39.502 49.0486 39.4423 49.3049 38.9571 49.347C38.5746 49.3812 38.1976 49.4697 37.7588 49.5437C37.1464 46.0771 36.5428 42.6293 35.9138 39.0886C37.1784 38.9073 38.3634 38.4253 39.6248 38.8454C40.2427 39.0532 40.749 39.4346 41.0375 40.0183C41.7571 41.4741 42.0202 42.941 41.0375 44.4134C40.9469 44.5483 40.9701 44.8368 41.0518 44.996C41.5714 46.0119 42.123 47.0123 42.6625 48.0171C42.7487 48.1973 42.8371 48.3765 42.9477 48.5909L42.9488 48.5898ZM38.5779 43.9624C39.2002 43.9182 39.6093 43.6529 39.7762 43.14C40.0548 42.28 39.8778 41.4597 39.334 40.7545C38.9968 40.3201 38.5138 40.2725 37.9611 40.4803C38.1645 41.651 38.369 42.7995 38.5779 43.9624ZM41.9417 37.9566C42.8946 37.8682 43.8409 37.6902 44.7805 37.7167C45.7554 37.7444 46.4917 38.3357 47.03 39.1406C47.8525 40.372 48.1509 41.7803 48.2681 43.2152C48.3429 44.0587 48.3027 44.9084 48.1487 45.741C47.8978 47.0311 47.0245 47.8204 45.7521 48.1366C45.2172 48.2697 44.6745 48.3693 44.1271 48.435C43.9934 48.4505 43.727 48.2935 43.7071 48.1829C43.1102 44.8158 42.5387 41.4487 41.9395 37.9566H41.9417ZM44.0266 39.3672C44.0059 39.4261 43.9951 39.4882 43.9945 39.5506C44.3836 41.7737 44.7794 43.9967 45.1652 46.2208C45.2248 46.5624 45.394 46.6 45.6693 46.4651C46.3403 46.1335 46.516 45.5177 46.5536 44.86C46.6174 43.4417 46.3827 42.0256 45.8649 40.7036C45.6996 40.3162 45.4677 39.9607 45.1796 39.6535C45.0447 39.4861 44.8587 39.3675 44.6501 39.3158C44.4416 39.2641 44.2217 39.2821 44.0244 39.3672H44.0266ZM17.1558 53.1673C17.1558 51.7237 17.1425 50.364 17.1558 49.0043C17.1801 46.9427 17.2354 44.8821 17.2519 42.8205C17.2519 42.448 17.3846 42.2944 17.7361 42.249C18.1904 42.1904 18.6392 42.1009 19.1466 42.0147C20.4134 45.3608 21.6803 48.7069 22.9803 52.1438L21.2525 52.4753C21.0612 51.9448 20.8567 51.4385 20.6997 50.9178C20.5893 50.5475 20.4178 50.4325 20.0188 50.5154C18.7575 50.7785 18.7708 50.7619 18.7752 52.0387C18.7752 52.9064 18.9908 52.8965 17.9218 53.0447C17.6853 53.0734 17.4554 53.1176 17.1558 53.1673ZM18.8581 45.6416L18.7686 45.677V49.1038L19.979 48.9048L18.8581 45.6416ZM37.0303 49.6742L36.1349 49.8323C35.3313 49.977 35.3313 49.977 35.0671 49.1944C35.0549 49.1591 35.0505 49.1226 35.0383 49.0838C34.6547 47.953 34.657 47.9784 33.462 48.1355C33.0132 48.1962 32.8407 48.372 32.9093 48.8065C32.9153 48.88 32.9153 48.954 32.9093 49.0276C32.9093 50.532 32.9093 50.532 31.2677 50.6602C31.2677 50.3043 31.2677 49.9506 31.2677 49.5979C31.2876 46.8365 31.3082 44.0755 31.3296 41.3149C31.3418 39.7408 31.3429 39.7308 32.8938 39.5927C32.9901 39.5984 33.0836 39.6273 33.1663 39.6772C33.2489 39.7271 33.3181 39.7964 33.368 39.879C34.5983 43.088 35.8144 46.306 37.0303 49.5205C37.0364 49.5716 37.0364 49.6231 37.0303 49.6742ZM32.9844 43.2163L32.8739 43.2428V46.6375L34.081 46.3866L32.9844 43.2163ZM20.7661 20.6279C21.0711 22.3336 21.3774 24.0381 21.688 25.7748L23.1018 25.5327C22.5702 22.527 22.0462 19.5699 21.5177 16.5887C21.3232 16.6206 21.1994 16.6394 21.0756 16.6616C20.0586 16.8473 20.0575 16.8473 19.8906 17.8676C19.7645 18.6336 19.643 19.4008 19.5191 20.1669L19.3666 20.1901C19.0427 19.6031 18.7166 19.0162 18.3938 18.428C17.7305 17.2121 17.7305 17.2121 16.3697 17.4907C16.3532 17.4907 16.3411 17.5138 16.2725 17.5724C16.7884 20.4923 17.3098 23.4523 17.8367 26.4524L19.2484 26.2081C18.9443 24.4482 18.6458 22.7249 18.3485 21.0004L18.4911 20.9606L20.0962 23.8845C20.2786 22.6928 20.4355 21.6604 20.5937 20.6279H20.7661ZM52.3372 29.2148C52.2266 28.5914 52.1294 28.0045 52.021 27.3654L49.9749 27.706C49.8146 26.7951 49.6566 25.9041 49.494 24.9844L51.7988 24.5499C51.6884 23.921 51.5888 23.3472 51.475 22.7005L47.1937 23.4523C47.8569 27.1864 48.5025 30.8697 49.1613 34.606L53.4957 33.8323C53.3752 33.1767 53.2691 32.6052 53.1552 31.9873L50.7996 32.3753C50.6326 31.4489 50.4745 30.5668 50.2999 29.594L52.3372 29.2148ZM30.2739 26.4358L32.2427 37.5896L36.5782 36.8158C36.4544 36.1525 36.3471 35.5833 36.2333 34.9708L33.8776 35.36C33.7096 34.4137 33.546 33.5183 33.3845 32.5809L35.4196 32.1918C35.3092 31.5695 35.2096 30.9813 35.1013 30.349L33.0508 30.6873C32.8905 29.7687 32.7346 28.8777 32.5743 27.9646L34.8692 27.5413C34.7686 26.9376 34.6747 26.364 34.5607 25.6819L30.2739 26.4358ZM44.818 21.709L46.2485 21.4404C45.9821 19.8928 45.7256 18.3982 45.4691 16.9081C45.6158 16.9623 45.7372 17.0691 45.8096 17.2077C46.3587 18.1863 46.9047 19.1665 47.4479 20.1481C48.0139 21.1695 48.0128 21.1706 49.1458 20.9296C49.179 20.923 49.2055 20.8909 49.3083 20.8191C48.7924 17.9008 48.2718 14.9493 47.7463 11.9646L46.3093 12.2023L47.0521 16.5256C46.8783 16.4378 46.7379 16.2958 46.652 16.1211C46.1855 15.2864 45.7256 14.4474 45.2591 13.6128C44.6213 12.4698 44.6191 12.4709 43.3467 12.7285C43.3313 12.7285 43.318 12.7495 43.245 12.8058C43.7668 15.7717 44.2908 18.7276 44.818 21.709ZM32.8496 23.7993C32.3809 23.8911 31.9896 24.0071 31.5937 24.0281C31.4949 24.0202 31.3992 23.9898 31.3139 23.9395C31.2285 23.8891 31.1556 23.8201 31.1008 23.7375C30.6785 23.0057 30.3059 22.2451 29.8925 21.5067C29.8173 21.3729 29.6383 21.2967 29.5079 21.1927C29.4736 21.3552 29.3895 21.5244 29.4127 21.678C29.5477 22.5447 29.7068 23.408 29.8671 24.3311L28.4135 24.6141C28.2664 23.8402 28.1194 23.1117 27.9901 22.3778C27.6352 20.3703 27.3081 18.3585 26.9233 16.3576C26.8194 15.8215 26.9012 15.5628 27.4761 15.5218C27.8408 15.4964 28.2001 15.4014 28.5638 15.3572C30.6509 15.1073 31.4235 16.2946 31.6789 17.8997C31.8049 18.6945 31.7121 19.4716 31.2312 20.1736C31.1394 20.3073 31.1494 20.5925 31.2312 20.7495C31.7331 21.7378 32.2769 22.7193 32.8496 23.7993ZM29.0834 19.7634C29.8184 19.7634 30.1888 19.3765 30.1999 18.6237C30.2209 17.4774 29.7721 16.7633 29.0325 16.7357C28.7008 16.7224 28.5494 16.8461 28.6114 17.1856C28.7694 18.0434 28.9263 18.9056 29.0834 19.7634ZM16.5644 40.3565L18.5176 39.9928C18.2446 38.4165 17.9837 36.9175 17.7173 35.3799L19.5512 35.0184L19.2108 33.1889L17.3779 33.4774C17.2133 32.5389 17.0573 31.6468 16.896 30.7304L19.003 30.3335C18.8835 29.6935 18.7708 29.0944 18.6558 28.4797L14.5966 29.2038C15.2533 32.9369 15.9055 36.6212 16.5644 40.3565ZM46.4817 24.1631C46.4441 23.8037 46.2529 23.7209 45.9434 23.6921C44.4555 23.5374 43.2097 24.4206 42.784 25.955C42.4148 27.2815 42.5563 28.6213 42.794 29.9478C43.0538 31.4014 43.3843 32.8352 44.3317 34.0302C45.2359 35.171 46.7117 35.4672 47.942 34.7431C48.0924 34.6547 48.2913 34.448 48.2736 34.3153C48.2172 33.7549 48.0902 33.2021 47.9862 32.6318C46.3634 33.4475 45.6869 33.1944 45.2315 31.4533C44.8975 30.1956 44.6799 28.9097 44.5815 27.612C44.4643 25.9428 45.0535 25.4785 46.7437 25.7328C46.6475 25.1679 46.537 24.6682 46.4817 24.1631ZM51.9426 36.7241C51.9308 36.6744 51.9091 36.6275 51.8787 36.5865C51.8482 36.5455 51.8098 36.511 51.7657 36.4853C50.3949 35.8475 48.3599 37.0745 48.2195 38.611C48.109 39.827 48.4638 40.8683 49.3868 41.6852C49.9516 42.1849 50.5553 42.6425 51.1079 43.1566C51.412 43.4204 51.6636 43.7392 51.8497 44.0962C52.2134 44.8755 51.8099 45.5244 50.951 45.5498C50.4657 45.5642 49.9771 45.4515 49.4266 45.3884C49.5095 45.8914 49.5836 46.4131 49.6931 46.9261C49.7118 47.0168 49.8666 47.1162 49.976 47.1472C51.9139 47.6203 53.9434 46.6254 53.7224 44.2233C53.6118 42.9775 52.8987 42.1307 52.0111 41.3724C51.4794 40.9181 50.9245 40.4881 50.4115 40.0127C50.0268 39.6568 49.8035 39.2036 50.0556 38.6729C50.3076 38.1423 50.7952 38.0429 51.318 38.0893C51.6245 38.1345 51.9283 38.1969 52.2277 38.2761C52.1272 37.7267 52.0443 37.2292 51.9426 36.7241ZM21.3221 28.0067L19.3666 28.3747C20.0299 32.1332 20.6765 35.7955 21.332 39.5075L25.3392 38.8033C25.2287 38.1655 25.1237 37.5819 25.0143 36.9551L22.9659 37.2867L21.3221 28.0067ZM17.2431 26.5486C16.8009 26.6392 16.4129 26.7409 16.0194 26.7829C15.9165 26.794 15.7452 26.6415 15.6877 26.5253C15.5486 26.2441 15.4435 25.9472 15.3749 25.641C15.2754 25.1712 15.009 25.0574 14.5811 25.169C14.4221 25.2138 14.2593 25.2445 14.0948 25.2607C13.7764 25.2862 13.6328 25.442 13.6648 25.7637C13.6703 25.8742 13.6703 25.9849 13.6648 26.0953C13.6703 27.3511 13.6703 27.3511 12.3581 27.3699V18.2556C12.4687 18.1826 12.4975 18.1451 12.5296 18.1451C13.0125 18.081 13.604 17.8267 13.95 18.0168C14.2728 18.1948 14.3402 18.8437 14.5094 19.2892C15.3384 21.4691 16.1652 23.649 16.99 25.8289C17.0728 26.05 17.1447 26.2733 17.2431 26.5486ZM13.7665 21.0767L13.6758 21.1153V23.9818L14.7006 23.7607C14.3689 22.81 14.065 21.9434 13.7632 21.0767H13.7665ZM6.96255 42.0412L8.92359 41.6974C8.26033 37.9632 7.61586 34.2844 6.95813 30.5524L4.99378 30.8918C5.65373 34.6492 6.2993 38.3269 6.96255 42.0412ZM24.1332 25.3491C25.1181 25.1734 26.0334 24.9822 26.9587 24.8562C27.4551 24.7898 27.56 24.6119 27.4396 24.1343C27.2395 23.3383 27.2705 23.3317 26.4623 23.491C26.2143 23.5583 25.9596 23.599 25.703 23.6125C25.5691 23.6125 25.3459 23.4744 25.3215 23.3638C25.1801 22.7005 25.085 22.0373 24.9656 21.3198L26.6083 20.9661C26.5165 20.4775 26.4369 20.0541 26.3518 19.6053C25.8787 19.6783 25.4675 19.7601 25.0441 19.7977C24.9181 19.8087 24.6815 19.7204 24.666 19.6418C24.5234 18.9664 24.4206 18.2821 24.3001 17.5669L26.1728 17.1745C26.0755 16.666 25.9947 16.2415 25.9097 15.7971L22.5492 16.4029C23.0764 19.3953 23.5993 22.3535 24.1299 25.3535L24.1332 25.3491ZM63.9741 46.0395C62.7139 48.3754 61.2791 50.5796 59.5071 52.5793C56.1908 56.3167 52.524 59.5954 48.0658 61.9213C42.7675 64.6849 37.1575 65.9461 31.177 65.4343C30.9018 65.4111 30.6243 65.3935 30.3513 65.3714C30.0782 65.3492 29.8217 65.326 29.5565 65.3039C29.5565 65.3536 29.5664 65.4034 29.5708 65.4542C36.8888 66.4491 43.7458 64.9347 50.1982 61.4525C56.7313 57.9274 61.2824 52.587 64.1476 45.7632C64.0901 45.8516 64.0261 45.9433 63.9741 46.0395ZM33.4642 14.4695L31.9896 14.7481C32.5146 17.7327 33.0331 20.6709 33.5604 23.6645L35.0538 23.4434C34.5187 20.4189 33.9937 17.4553 33.4653 14.4695H33.4642ZM13.898 6.33685C6.09921 12.0873 1.60121 19.7634 0.527838 29.4017C-0.118841 35.2206 0.831831 40.8042 3.20409 46.1479C3.63852 47.125 4.14923 48.068 4.6522 49.0816C4.7119 48.9711 4.73179 48.9501 4.72737 48.9402C4.64889 48.7755 4.57261 48.6086 4.48639 48.4482C2.34942 44.4847 1.05406 40.1226 0.681492 35.6352C0.11109 28.6813 1.58831 22.1866 5.11317 16.1509C6.37447 14.003 7.84027 12.0022 9.65654 10.2777C10.5177 9.48183 11.36 8.66379 12.2465 7.89883C13.0358 7.21788 13.876 6.59442 14.6928 5.94663C14.4264 6.07486 14.1301 6.16661 13.8958 6.33685H13.898ZM22.0639 63.9033C28.3792 66.6016 34.8681 66.9599 41.5095 65.3338C34.93 66.312 28.4179 66.1694 22.0639 63.9033Z"
                        fill="#5B80D0"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1_208">
                        <rect
                            width="66"
                            height="66"
                            fill="white"
                            transform="translate(0.330002 0.309937)"
                        />
                    </clipPath>
                </defs>
            </svg>
            <span className="text-[22px] font-bold py-4">Winner</span>
            <span className="max-w-[160px] text-base font-normal">Female Fitness Influencer of the Year 2021</span>
        </div>
    );
}

export default CardAchivements;