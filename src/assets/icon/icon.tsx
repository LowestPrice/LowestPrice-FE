import { SVGProps } from 'react';

// 좋아요 하트 아이콘
export const LineHeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.80641 6.20641C4.70654 5.30655 5.92722 4.80104 7.20001 4.80104C8.47279 4.80104 9.69347 5.30655 10.5936 6.20641L12 7.61161L13.4064 6.20641C13.8492 5.74796 14.3788 5.38229 14.9645 5.13072C15.5501 4.87916 16.1799 4.74675 16.8173 4.74121C17.4546 4.73567 18.0867 4.85712 18.6766 5.09847C19.2665 5.33982 19.8024 5.69623 20.2531 6.14691C20.7038 6.5976 21.0602 7.13353 21.3015 7.72343C21.5429 8.31333 21.6643 8.9454 21.6588 9.58274C21.6533 10.2201 21.5209 10.8499 21.2693 11.4356C21.0177 12.0212 20.6521 12.5508 20.1936 12.9936L12 21.1884L3.80641 12.9936C2.90655 12.0935 2.40103 10.8728 2.40103 9.60001C2.40103 8.32722 2.90655 7.10654 3.80641 6.20641Z'
      fill='none'
      stroke='black'
      strokeWidth='2'
      strokeLinejoin='round'
    />
  </svg>
);

export const ColorHeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.80641 6.20641C4.70654 5.30655 5.92722 4.80104 7.20001 4.80104C8.47279 4.80104 9.69347 5.30655 10.5936 6.20641L12 7.61161L13.4064 6.20641C13.8492 5.74796 14.3788 5.38229 14.9645 5.13072C15.5501 4.87916 16.1799 4.74675 16.8173 4.74121C17.4546 4.73567 18.0867 4.85712 18.6766 5.09847C19.2665 5.33982 19.8024 5.69623 20.2531 6.14691C20.7038 6.5976 21.0602 7.13353 21.3015 7.72343C21.5429 8.31333 21.6643 8.9454 21.6588 9.58274C21.6533 10.2201 21.5209 10.8499 21.2693 11.4356C21.0177 12.0212 20.6521 12.5508 20.1936 12.9936L12 21.1884L3.80641 12.9936C2.90655 12.0935 2.40103 10.8728 2.40103 9.60001C2.40103 8.32722 2.90655 7.10654 3.80641 6.20641Z'
      fill='#00ABF9'
      stroke='#00ABF9'
      strokeWidth='2'
      strokeLinejoin='round'
    />
  </svg>
);

// 푸터 홈 아이콘
export const HomeIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M9 21.1847V14.3375C9 13.7073 9.53726 13.1963 10.2 13.1963H13.8C14.4627 13.1963 15 13.7073 15 14.3375V21.1847M11.3046 3.39586L3.50457 8.67072C3.18802 8.8848 3 9.23135 3 9.60075V19.4729C3 20.4183 3.80589 21.1847 4.8 21.1847H19.2C20.1941 21.1847 21 20.4183 21 19.4729V9.60074C21 9.23135 20.812 8.8848 20.4954 8.67072L12.6954 3.39586C12.2791 3.1143 11.7209 3.1143 11.3046 3.39586Z'
        stroke='#6F6F6F'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

export const ColorHomeIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M9 21.1847V14.3375C9 13.7073 9.53726 13.1963 10.2 13.1963H13.8C14.4627 13.1963 15 13.7073 15 14.3375V21.1847M11.3046 3.39586L3.50457 8.67072C3.18802 8.8848 3 9.23135 3 9.60075V19.4729C3 20.4183 3.80589 21.1847 4.8 21.1847H19.2C20.1941 21.1847 21 20.4183 21 19.4729V9.60074C21 9.23135 20.812 8.8848 20.4954 8.67072L12.6954 3.39586C12.2791 3.1143 11.7209 3.1143 11.3046 3.39586Z'
        stroke='#00ABF9'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

// 푸터 알림 아이콘
export const BellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width='24' height='24' viewBox='0 0 18 21' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M1.47059 14.8318L0.649889 14.2604L0.649888 14.2604L1.47059 14.8318ZM2.69156 11.2881L1.69156 11.2768V11.2881H2.69156ZM2.71444 9.24899L3.71444 9.26021V9.24899H2.71444ZM16.5294 15.3023L17.3611 14.7471L17.3611 14.7471L16.5294 15.3023ZM15.3575 11.2881L14.3575 11.2763V11.2881H15.3575ZM15.3803 9.35003L16.3803 9.36184V9.35003H15.3803ZM7.12399 17.5538C6.69173 17.21 6.06264 17.2818 5.71889 17.714C5.37513 18.1463 5.44688 18.7754 5.87914 19.1191L7.12399 17.5538ZM12.123 19.1191C12.5553 18.7754 12.6271 18.1463 12.2833 17.714C11.9395 17.2818 11.3105 17.21 10.8782 17.5538L12.123 19.1191ZM0.0652467 4.20861C-0.130979 4.72486 0.128453 5.30243 0.644702 5.49866C1.16095 5.69488 1.73853 5.43545 1.93475 4.9192L0.0652467 4.20861ZM4.31024 2.05416C4.79043 1.78134 4.95854 1.1709 4.68572 0.690704C4.41289 0.21051 3.80245 0.0424017 3.32226 0.315224L4.31024 2.05416ZM14.6674 0.3298C14.1902 0.0517485 13.578 0.213179 13.2999 0.690364C13.0219 1.16755 13.1833 1.77979 13.6605 2.05784L14.6674 0.3298ZM16.0616 4.90039C16.2526 5.41863 16.8274 5.68398 17.3457 5.49306C17.8639 5.30215 18.1293 4.72727 17.9384 4.20903L16.0616 4.90039ZM2.29129 15.4031C2.90576 14.5205 3.69156 12.9806 3.69156 11.2881H1.69156C1.69156 12.41 1.1448 13.5495 0.649889 14.2604L2.29129 15.4031ZM3.6915 11.2993L3.71438 9.26021L1.7145 9.23777L1.69162 11.2768L3.6915 11.2993ZM17.3611 14.7471C17.1663 14.4553 16.9083 13.9032 16.6986 13.2302C16.4906 12.5624 16.3575 11.8629 16.3575 11.2881H14.3575C14.3575 12.1301 14.5443 13.0392 14.7892 13.8251C15.0324 14.6057 15.3604 15.3523 15.6977 15.8576L17.3611 14.7471ZM16.3574 11.2999L16.3803 9.36184L14.3804 9.33823L14.3575 11.2763L16.3574 11.2999ZM16.3803 9.35003C16.3803 5.03736 13.1569 1.38934 9.00109 1.38934V3.38934C11.8917 3.38934 14.3803 5.97414 14.3803 9.35003H16.3803ZM16.0248 16.622C16.0979 16.622 16.2293 16.6238 16.3374 16.6198C16.432 16.6163 16.6336 16.6069 16.838 16.5358C17.0608 16.4583 17.5173 16.2117 17.5939 15.6276C17.6503 15.1973 17.4412 14.8671 17.3611 14.7471L15.6977 15.8576C15.6972 15.8568 15.6918 15.8487 15.6839 15.8339C15.6762 15.8194 15.6636 15.794 15.6507 15.7588C15.6271 15.6943 15.5865 15.5535 15.6109 15.3675C15.6381 15.1596 15.7366 14.9739 15.8765 14.8378C16.0001 14.7176 16.124 14.6666 16.1812 14.6467C16.2796 14.6125 16.3363 14.6185 16.2638 14.6211C16.2047 14.6233 16.1468 14.622 16.0248 14.622V16.622ZM3.71444 9.24899C3.71444 5.9289 6.16167 3.38934 9.00109 3.38934V1.38934C4.89647 1.38934 1.71444 4.99213 1.71444 9.24899H3.71444ZM1.97833 14.622C2.14734 14.622 2.25187 14.7045 2.30793 14.7852C2.34238 14.8348 2.38434 14.9198 2.39163 15.039C2.3996 15.1691 2.36277 15.3004 2.29129 15.4031L0.649888 14.2604C0.236858 14.8537 0.379061 15.514 0.665319 15.9261C0.936215 16.3161 1.41414 16.622 1.97833 16.622V14.622ZM16.0248 14.622H1.97833V16.622H16.0248V14.622ZM9.00109 18.1847C8.26333 18.1847 7.60759 17.9383 7.12399 17.5538L5.87914 19.1191C6.72218 19.7895 7.81833 20.1847 9.00109 20.1847V18.1847ZM10.8782 17.5538C10.3946 17.9383 9.73885 18.1847 9.00109 18.1847V20.1847C10.1839 20.1847 11.28 19.7895 12.123 19.1191L10.8782 17.5538ZM1.93475 4.9192C2.40847 3.6729 3.24648 2.65854 4.31024 2.05416L3.32226 0.315224C1.81302 1.1727 0.686701 2.57362 0.0652467 4.20861L1.93475 4.9192ZM13.6605 2.05784C14.7588 2.69784 15.6172 3.69393 16.0616 4.90039L17.9384 4.20903C17.3274 2.55072 16.1526 1.19521 14.6674 0.3298L13.6605 2.05784Z'
      fill='#6F6F6F'
    />
  </svg>
);

export const ColorBellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width='24' height='24' viewBox='0 0 18 21' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M1.47059 14.8318L0.649889 14.2604L0.649888 14.2604L1.47059 14.8318ZM2.69156 11.2881L1.69156 11.2768V11.2881H2.69156ZM2.71444 9.24899L3.71444 9.26021V9.24899H2.71444ZM16.5294 15.3023L17.3611 14.7471L17.3611 14.7471L16.5294 15.3023ZM15.3575 11.2881L14.3575 11.2763V11.2881H15.3575ZM15.3803 9.35003L16.3803 9.36184V9.35003H15.3803ZM7.12399 17.5538C6.69173 17.21 6.06264 17.2818 5.71889 17.714C5.37513 18.1463 5.44688 18.7754 5.87914 19.1191L7.12399 17.5538ZM12.123 19.1191C12.5553 18.7754 12.6271 18.1463 12.2833 17.714C11.9395 17.2818 11.3105 17.21 10.8782 17.5538L12.123 19.1191ZM0.0652467 4.20861C-0.130979 4.72486 0.128453 5.30243 0.644702 5.49866C1.16095 5.69488 1.73853 5.43545 1.93475 4.9192L0.0652467 4.20861ZM4.31024 2.05416C4.79043 1.78134 4.95854 1.1709 4.68572 0.690704C4.41289 0.21051 3.80245 0.0424017 3.32226 0.315224L4.31024 2.05416ZM14.6674 0.3298C14.1902 0.0517485 13.578 0.213179 13.2999 0.690364C13.0219 1.16755 13.1833 1.77979 13.6605 2.05784L14.6674 0.3298ZM16.0616 4.90039C16.2526 5.41863 16.8274 5.68398 17.3457 5.49306C17.8639 5.30215 18.1293 4.72727 17.9384 4.20903L16.0616 4.90039ZM2.29129 15.4031C2.90576 14.5205 3.69156 12.9806 3.69156 11.2881H1.69156C1.69156 12.41 1.1448 13.5495 0.649889 14.2604L2.29129 15.4031ZM3.6915 11.2993L3.71438 9.26021L1.7145 9.23777L1.69162 11.2768L3.6915 11.2993ZM17.3611 14.7471C17.1663 14.4553 16.9083 13.9032 16.6986 13.2302C16.4906 12.5624 16.3575 11.8629 16.3575 11.2881H14.3575C14.3575 12.1301 14.5443 13.0392 14.7892 13.8251C15.0324 14.6057 15.3604 15.3523 15.6977 15.8576L17.3611 14.7471ZM16.3574 11.2999L16.3803 9.36184L14.3804 9.33823L14.3575 11.2763L16.3574 11.2999ZM16.3803 9.35003C16.3803 5.03736 13.1569 1.38934 9.00109 1.38934V3.38934C11.8917 3.38934 14.3803 5.97414 14.3803 9.35003H16.3803ZM16.0248 16.622C16.0979 16.622 16.2293 16.6238 16.3374 16.6198C16.432 16.6163 16.6336 16.6069 16.838 16.5358C17.0608 16.4583 17.5173 16.2117 17.5939 15.6276C17.6503 15.1973 17.4412 14.8671 17.3611 14.7471L15.6977 15.8576C15.6972 15.8568 15.6918 15.8487 15.6839 15.8339C15.6762 15.8194 15.6636 15.794 15.6507 15.7588C15.6271 15.6943 15.5865 15.5535 15.6109 15.3675C15.6381 15.1596 15.7366 14.9739 15.8765 14.8378C16.0001 14.7176 16.124 14.6666 16.1812 14.6467C16.2796 14.6125 16.3363 14.6185 16.2638 14.6211C16.2047 14.6233 16.1468 14.622 16.0248 14.622V16.622ZM3.71444 9.24899C3.71444 5.9289 6.16167 3.38934 9.00109 3.38934V1.38934C4.89647 1.38934 1.71444 4.99213 1.71444 9.24899H3.71444ZM1.97833 14.622C2.14734 14.622 2.25187 14.7045 2.30793 14.7852C2.34238 14.8348 2.38434 14.9198 2.39163 15.039C2.3996 15.1691 2.36277 15.3004 2.29129 15.4031L0.649888 14.2604C0.236858 14.8537 0.379061 15.514 0.665319 15.9261C0.936215 16.3161 1.41414 16.622 1.97833 16.622V14.622ZM16.0248 14.622H1.97833V16.622H16.0248V14.622ZM9.00109 18.1847C8.26333 18.1847 7.60759 17.9383 7.12399 17.5538L5.87914 19.1191C6.72218 19.7895 7.81833 20.1847 9.00109 20.1847V18.1847ZM10.8782 17.5538C10.3946 17.9383 9.73885 18.1847 9.00109 18.1847V20.1847C10.1839 20.1847 11.28 19.7895 12.123 19.1191L10.8782 17.5538ZM1.93475 4.9192C2.40847 3.6729 3.24648 2.65854 4.31024 2.05416L3.32226 0.315224C1.81302 1.1727 0.686701 2.57362 0.0652467 4.20861L1.93475 4.9192ZM13.6605 2.05784C14.7588 2.69784 15.6172 3.69393 16.0616 4.90039L17.9384 4.20903C17.3274 2.55072 16.1526 1.19521 14.6674 0.3298L13.6605 2.05784Z'
      fill='#00ABF9'
    />
  </svg>
);

// 푸터 매거진 아이콘
export const FooterMagazineIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 16 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M15 5.6262H15.85C15.85 5.25578 15.6101 4.92801 15.257 4.81599L15 5.6262ZM15 9.6628L15.2568 10.4731C15.61 10.3611 15.85 10.0333 15.85 9.6628H15ZM6.48799 12.3607L6.23117 11.5504C5.87803 11.6624 5.63804 11.9901 5.63799 12.3606C5.63794 12.731 5.87784 13.0589 6.23096 13.1709L6.48799 12.3607ZM15 15.0611H15.85C15.85 14.6907 15.6101 14.3629 15.257 14.2509L15 15.0611ZM15 18.7798L14.7271 19.5848C14.9866 19.6728 15.2726 19.6302 15.4953 19.4706C15.7179 19.311 15.85 19.0538 15.85 18.7798H15ZM14.9999 18.7798L15.2728 17.9748C15.0133 17.8868 14.7274 17.9293 14.5047 18.089C14.282 18.2486 14.1499 18.5058 14.1499 18.7798H14.9999ZM14.9999 18.8093L15.3058 19.6023C15.6337 19.4759 15.8499 19.1607 15.8499 18.8093H14.9999ZM9.16558 21.0593L8.85974 20.2662C8.62535 20.3566 8.44295 20.5461 8.3615 20.7837C8.28005 21.0214 8.3079 21.2829 8.43756 21.498L9.16558 21.0593ZM10.1773 22.738L10.0314 23.5754C10.3594 23.6326 10.6905 23.493 10.8786 23.2183C11.0667 22.9436 11.0771 22.5844 10.9053 22.2993L10.1773 22.738ZM9.46465 22.6139L9.61052 21.7765C9.5993 21.7746 9.58805 21.7728 9.57676 21.7713L9.46465 22.6139ZM6.96919 22.2819L6.84283 23.1224C6.84757 23.1231 6.85232 23.1238 6.85708 23.1244L6.96919 22.2819ZM3.47272 21.7563L3.59907 20.9157C3.5881 20.9141 3.57709 20.9126 3.56606 20.9114L3.47272 21.7563ZM3.34216 21.7418L2.9537 20.9858C2.62007 21.1572 2.43825 21.5271 2.50625 21.8959C2.57425 22.2648 2.876 22.5455 3.24882 22.5867L3.34216 21.7418ZM3.35 21.7378L3.73846 22.4938C4.06663 22.3252 4.24855 21.9642 4.18876 21.6001C4.12898 21.236 3.84115 20.9521 3.47629 20.8972L3.35 21.7378ZM3.34216 21.7366L2.65565 21.2354C2.48035 21.4755 2.44324 21.7898 2.55779 22.0641C2.67233 22.3385 2.92188 22.533 3.21587 22.5772L3.34216 21.7366ZM5.17844 19.2214L5.86496 19.7226L5.86754 19.719L5.17844 19.2214ZM7.00966 16.6856L7.85951 16.6698C7.85271 16.304 7.61269 15.9837 7.26362 15.8744C6.91455 15.7651 6.5347 15.8914 6.32055 16.1879L7.00966 16.6856ZM7.01103 16.7594L6.16118 16.7752C6.16348 16.899 6.19279 17.0208 6.24707 17.1321L7.01103 16.7594ZM7.74147 18.2569L6.97751 18.6295C7.17723 19.039 7.66424 19.2182 8.08171 19.0358L7.74147 18.2569ZM10.2044 17.1811L10.5446 17.96C10.867 17.8192 11.0694 17.4943 11.0535 17.1428C11.0377 16.7914 10.807 16.486 10.4732 16.3747L10.2044 17.1811ZM1 14.1127H0.15C0.15 14.4785 0.384104 14.8033 0.731182 14.919L1 14.1127ZM1 10.6071L0.731182 9.80071C0.384104 9.91642 0.15 10.2412 0.15 10.6071H1ZM9.89315 7.64241L10.162 8.44878C10.509 8.33308 10.7432 8.00826 10.7432 7.64241C10.7432 7.27655 10.509 6.95174 10.162 6.83603L9.89315 7.64241ZM1 4.67773H0.15C0.15 5.04359 0.384104 5.3684 0.731182 5.4841L1 4.67773ZM1 1.18469L1.25704 0.374488C0.99868 0.292524 0.716722 0.33869 0.497995 0.498769C0.279268 0.658848 0.15 0.913645 0.15 1.18469H1ZM15.85 5.93995V5.6262H14.15V5.93995H15.85ZM15.85 9.34486V5.93995H14.15V9.34486H15.85ZM15.85 9.6628V9.34486H14.15V9.6628H15.85ZM6.74481 13.171L15.2568 10.4731L14.7432 8.85252L6.23117 11.5504L6.74481 13.171ZM15.257 14.2509L6.74503 11.5505L6.23096 13.1709L14.743 15.8713L15.257 14.2509ZM15.85 18.7798V15.0611H14.15V18.7798H15.85ZM14.7271 19.5848L14.7271 19.5848L15.2729 17.9748L15.2728 17.9748L14.7271 19.5848ZM15.8499 18.8093V18.7798H14.1499V18.8093H15.8499ZM9.47143 21.8524L15.3058 19.6023L14.6941 18.0162L8.85974 20.2662L9.47143 21.8524ZM10.9053 22.2993L9.8936 20.6206L8.43756 21.498L9.44925 23.1768L10.9053 22.2993ZM9.31878 23.4513L10.0314 23.5754L10.3231 21.9006L9.61052 21.7765L9.31878 23.4513ZM9.57676 21.7713L7.0813 21.4393L6.85708 23.1244L9.35254 23.4565L9.57676 21.7713ZM7.09554 21.4413L3.59907 20.9157L3.34636 22.5968L6.84283 23.1224L7.09554 21.4413ZM3.24882 22.5867L3.37938 22.6011L3.56606 20.9114L3.4355 20.897L3.24882 22.5867ZM2.96153 20.9818L2.9537 20.9858L3.73063 22.4979L3.73846 22.4938L2.96153 20.9818ZM3.47629 20.8972L3.46846 20.8961L3.21587 22.5772L3.2237 22.5784L3.47629 20.8972ZM4.02868 22.2378L5.86495 19.7226L4.49192 18.7202L2.65565 21.2354L4.02868 22.2378ZM5.86754 19.719L7.69876 17.1832L6.32055 16.1879L4.48933 18.7238L5.86754 19.719ZM6.1598 16.7014L6.16118 16.7752L7.86088 16.7436L7.85951 16.6698L6.1598 16.7014ZM8.50543 17.8843L7.77499 16.3868L6.24707 17.1321L6.97751 18.6295L8.50543 17.8843ZM9.86416 16.4022L7.40123 17.478L8.08171 19.0358L10.5446 17.96L9.86416 16.4022ZM0.731182 14.919L9.93558 17.9875L10.4732 16.3747L1.26882 13.3063L0.731182 14.919ZM0.15 14.1001V14.1127H1.85V14.1001H0.15ZM0.15 10.6196V14.1001H1.85V10.6196H0.15ZM0.15 10.6071V10.6196H1.85V10.6071H0.15ZM9.62433 6.83603L0.731182 9.80071L1.26882 11.4135L10.162 8.44878L9.62433 6.83603ZM0.731182 5.4841L9.62433 8.44878L10.162 6.83603L1.26882 3.87136L0.731182 5.4841ZM0.15 1.18469V4.67773H1.85V1.18469H0.15ZM15.257 4.81599L1.25704 0.374488L0.742962 1.9949L14.743 6.4364L15.257 4.81599Z'
        fill='#6F6F6F'
      />
    </svg>
  );
};

export const ColorFooterMagazineIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 16 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M15 5.6262H15.85C15.85 5.25578 15.6101 4.92801 15.257 4.81599L15 5.6262ZM15 9.6628L15.2568 10.4731C15.61 10.3611 15.85 10.0333 15.85 9.6628H15ZM6.48799 12.3607L6.23117 11.5504C5.87803 11.6624 5.63804 11.9901 5.63799 12.3606C5.63794 12.731 5.87784 13.0589 6.23096 13.1709L6.48799 12.3607ZM15 15.0611H15.85C15.85 14.6907 15.6101 14.3629 15.257 14.2509L15 15.0611ZM15 18.7798L14.7271 19.5848C14.9866 19.6728 15.2726 19.6302 15.4953 19.4706C15.7179 19.311 15.85 19.0538 15.85 18.7798H15ZM14.9999 18.7798L15.2728 17.9748C15.0133 17.8868 14.7274 17.9293 14.5047 18.089C14.282 18.2486 14.1499 18.5058 14.1499 18.7798H14.9999ZM14.9999 18.8093L15.3058 19.6023C15.6337 19.4759 15.8499 19.1607 15.8499 18.8093H14.9999ZM9.16558 21.0593L8.85974 20.2662C8.62535 20.3566 8.44295 20.5461 8.3615 20.7837C8.28005 21.0214 8.3079 21.2829 8.43756 21.498L9.16558 21.0593ZM10.1773 22.738L10.0314 23.5754C10.3594 23.6326 10.6905 23.493 10.8786 23.2183C11.0667 22.9436 11.0771 22.5844 10.9053 22.2993L10.1773 22.738ZM9.46465 22.6139L9.61052 21.7765C9.5993 21.7746 9.58805 21.7728 9.57676 21.7713L9.46465 22.6139ZM6.96919 22.2819L6.84283 23.1224C6.84757 23.1231 6.85232 23.1238 6.85708 23.1244L6.96919 22.2819ZM3.47272 21.7563L3.59907 20.9157C3.5881 20.9141 3.57709 20.9126 3.56606 20.9114L3.47272 21.7563ZM3.34216 21.7418L2.9537 20.9858C2.62007 21.1572 2.43825 21.5271 2.50625 21.8959C2.57425 22.2648 2.876 22.5455 3.24882 22.5867L3.34216 21.7418ZM3.35 21.7378L3.73846 22.4938C4.06663 22.3252 4.24855 21.9642 4.18876 21.6001C4.12898 21.236 3.84115 20.9521 3.47629 20.8972L3.35 21.7378ZM3.34216 21.7366L2.65565 21.2354C2.48035 21.4755 2.44324 21.7898 2.55779 22.0641C2.67233 22.3385 2.92188 22.533 3.21587 22.5772L3.34216 21.7366ZM5.17844 19.2214L5.86496 19.7226L5.86754 19.719L5.17844 19.2214ZM7.00966 16.6856L7.85951 16.6698C7.85271 16.304 7.61269 15.9837 7.26362 15.8744C6.91455 15.7651 6.5347 15.8914 6.32055 16.1879L7.00966 16.6856ZM7.01103 16.7594L6.16118 16.7752C6.16348 16.899 6.19279 17.0208 6.24707 17.1321L7.01103 16.7594ZM7.74147 18.2569L6.97751 18.6295C7.17723 19.039 7.66424 19.2182 8.08171 19.0358L7.74147 18.2569ZM10.2044 17.1811L10.5446 17.96C10.867 17.8192 11.0694 17.4943 11.0535 17.1428C11.0377 16.7914 10.807 16.486 10.4732 16.3747L10.2044 17.1811ZM1 14.1127H0.15C0.15 14.4785 0.384104 14.8033 0.731182 14.919L1 14.1127ZM1 10.6071L0.731182 9.80071C0.384104 9.91642 0.15 10.2412 0.15 10.6071H1ZM9.89315 7.64241L10.162 8.44878C10.509 8.33308 10.7432 8.00826 10.7432 7.64241C10.7432 7.27655 10.509 6.95174 10.162 6.83603L9.89315 7.64241ZM1 4.67773H0.15C0.15 5.04359 0.384104 5.3684 0.731182 5.4841L1 4.67773ZM1 1.18469L1.25704 0.374488C0.99868 0.292524 0.716722 0.33869 0.497995 0.498769C0.279268 0.658848 0.15 0.913645 0.15 1.18469H1ZM15.85 5.93995V5.6262H14.15V5.93995H15.85ZM15.85 9.34486V5.93995H14.15V9.34486H15.85ZM15.85 9.6628V9.34486H14.15V9.6628H15.85ZM6.74481 13.171L15.2568 10.4731L14.7432 8.85252L6.23117 11.5504L6.74481 13.171ZM15.257 14.2509L6.74503 11.5505L6.23096 13.1709L14.743 15.8713L15.257 14.2509ZM15.85 18.7798V15.0611H14.15V18.7798H15.85ZM14.7271 19.5848L14.7271 19.5848L15.2729 17.9748L15.2728 17.9748L14.7271 19.5848ZM15.8499 18.8093V18.7798H14.1499V18.8093H15.8499ZM9.47143 21.8524L15.3058 19.6023L14.6941 18.0162L8.85974 20.2662L9.47143 21.8524ZM10.9053 22.2993L9.8936 20.6206L8.43756 21.498L9.44925 23.1768L10.9053 22.2993ZM9.31878 23.4513L10.0314 23.5754L10.3231 21.9006L9.61052 21.7765L9.31878 23.4513ZM9.57676 21.7713L7.0813 21.4393L6.85708 23.1244L9.35254 23.4565L9.57676 21.7713ZM7.09554 21.4413L3.59907 20.9157L3.34636 22.5968L6.84283 23.1224L7.09554 21.4413ZM3.24882 22.5867L3.37938 22.6011L3.56606 20.9114L3.4355 20.897L3.24882 22.5867ZM2.96153 20.9818L2.9537 20.9858L3.73063 22.4979L3.73846 22.4938L2.96153 20.9818ZM3.47629 20.8972L3.46846 20.8961L3.21587 22.5772L3.2237 22.5784L3.47629 20.8972ZM4.02868 22.2378L5.86495 19.7226L4.49192 18.7202L2.65565 21.2354L4.02868 22.2378ZM5.86754 19.719L7.69876 17.1832L6.32055 16.1879L4.48933 18.7238L5.86754 19.719ZM6.1598 16.7014L6.16118 16.7752L7.86088 16.7436L7.85951 16.6698L6.1598 16.7014ZM8.50543 17.8843L7.77499 16.3868L6.24707 17.1321L6.97751 18.6295L8.50543 17.8843ZM9.86416 16.4022L7.40123 17.478L8.08171 19.0358L10.5446 17.96L9.86416 16.4022ZM0.731182 14.919L9.93558 17.9875L10.4732 16.3747L1.26882 13.3063L0.731182 14.919ZM0.15 14.1001V14.1127H1.85V14.1001H0.15ZM0.15 10.6196V14.1001H1.85V10.6196H0.15ZM0.15 10.6071V10.6196H1.85V10.6071H0.15ZM9.62433 6.83603L0.731182 9.80071L1.26882 11.4135L10.162 8.44878L9.62433 6.83603ZM0.731182 5.4841L9.62433 8.44878L10.162 6.83603L1.26882 3.87136L0.731182 5.4841ZM0.15 1.18469V4.67773H1.85V1.18469H0.15ZM15.257 4.81599L1.25704 0.374488L0.742962 1.9949L14.743 6.4364L15.257 4.81599Z'
        fill='#00ABF9'
      />
    </svg>
  );
};

// 푸터 마이페이지 아이콘
export const MyPageIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M5.39999 18.8924C5.86116 18.3891 8.02104 16.0733 8.654 16.0733H15.3464C16.2636 16.0733 18.136 17.993 18.6 18.6696M21.6 11.877C21.6 17.043 17.3019 21.2308 12 21.2308C6.69806 21.2308 2.39999 17.043 2.39999 11.877C2.39999 6.71101 6.69806 2.52316 12 2.52316C17.3019 2.52316 21.6 6.71101 21.6 11.877ZM15.4388 8.68886C15.4388 6.90431 13.8927 5.44623 12.0003 5.44623C10.1079 5.44623 8.56173 6.90431 8.56173 8.68886C8.56173 10.4734 10.1079 11.9315 12.0003 11.9315C13.8927 11.9315 15.4388 10.4734 15.4388 8.68886Z'
        stroke='#6F6F6F'
        strokeWidth='2'
      />
    </svg>
  );
};

export const ColorMyPageIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M5.39999 18.8924C5.86116 18.3891 8.02104 16.0733 8.654 16.0733H15.3464C16.2636 16.0733 18.136 17.993 18.6 18.6696M21.6 11.877C21.6 17.043 17.3019 21.2308 12 21.2308C6.69806 21.2308 2.39999 17.043 2.39999 11.877C2.39999 6.71101 6.69806 2.52316 12 2.52316C17.3019 2.52316 21.6 6.71101 21.6 11.877ZM15.4388 8.68886C15.4388 6.90431 13.8927 5.44623 12.0003 5.44623C10.1079 5.44623 8.56173 6.90431 8.56173 8.68886C8.56173 10.4734 10.1079 11.9315 12.0003 11.9315C13.8927 11.9315 15.4388 10.4734 15.4388 8.68886Z'
        stroke='#00ABF9'
        strokeWidth='2'
      />
    </svg>
  );
};

// 하얀 배경, 파란색 로고
export const BlueLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='23.603' viewBox='0 0 16 24' fill='none' {...props}>
      <path d='M16 9.3564V5.17677L0 0.184692V4.11073L16 9.3564Z' fill='#00ABF9' />
      <path d='M16 5.52893V9.71326L0 14.7006V10.7746L16 5.52893Z' fill='#00ABF9' />
      <path d='M16 19.9604V15.7808L0 10.7887V14.7147L16 19.9604Z' fill='#00ABF9' />
      <path d='M16 15.809V19.9933L7.34487 23.2759L7.29791 19.5471L16 15.809Z' fill='#00ABF9' />
      <path d='M8.54714 21.7872L9.76815 23.7878L6.246 23.182L3.40479 22.8721L5.33963 21.8905L6.80484 18.2604L8.54714 21.7872Z' fill='#00ABF9' />
    </svg>
  );
};

// 뒤로가기 버튼 아이콘
export const BackIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='17' height='18' viewBox='0 0 17 18' fill='none' {...props}>
      <path d='M9 1L1 9L9 17' stroke='#FFF' strokeWidth='2' stroke-linecap='round' stroke-linejoin='round' />
    </svg>
  );
};

// 매거진 작성 페이지 사진 추가 아이콘
export const AddImageIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M5.36541 21L14.9007 11.9677L19.388 16.4838M5.36541 21H16.5835C18.4421 21 19.9489 19.4835 19.9489 17.6129V11.9677M5.36541 21C3.50675 21 2 19.4835 2 17.6129V6.32246C2 4.4518 3.50675 2.93533 5.36541 2.93533H12.6571M18.8271 8.38683L18.8271 5.19341M18.8271 5.19341L18.8271 2M18.8271 5.19341L15.6541 5.19341M18.8271 5.19341L22 5.19341M8.73082 8.01602C8.73082 8.95135 7.97745 9.70958 7.04812 9.70958C6.11879 9.70958 5.36541 8.95135 5.36541 8.01602C5.36541 7.08069 6.11879 6.32246 7.04812 6.32246C7.97745 6.32246 8.73082 7.08069 8.73082 8.01602Z'
        stroke='#6F6F6F'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

// 매거진 상세보기 드롭다운 아이콘(수정/삭제용)
export const DropDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='#FFFFF' {...props}>
      <circle cx='12' cy='4' r='2' fill='white' />
      <circle cx='12' cy='12' r='2' fill='white' />
      <circle cx='12' cy='20' r='2' fill='white' />
    </svg>
  );
};

// 공유하기 아이콘
export const ShareIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path d='M12.425 14.5V1M12.425 1L8.675 4.675M12.425 1L16.025 4.675' stroke='white' stroke-width='1.9125' stroke-linecap='round' stroke-linejoin='round' />
      <path
        d='M8.675 8.34998H8.15C6.4103 8.34998 5 9.76028 5 11.5V18.85C5 20.5897 6.4103 22 8.15 22H16.55C18.2897 22 19.7 20.5897 19.7 18.85V11.5C19.7 9.76028 18.2897 8.34998 16.55 8.34998H16.025'
        stroke='white'
        stroke-width='1.785'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
