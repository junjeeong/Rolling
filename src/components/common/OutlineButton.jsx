import styled from 'styled-components';
import { Link } from 'react-router-dom';

// OutlineButton에서 Pressed 타입 2가지 중, white배경 디폴트값
// 가져다가 쓸 때, 스타일링 추가해서 사용
const Button = styled.button`
	padding: 6px 16px;
	border: 1px solid var(--gray-300);
	background: var(--white);
	border-radius: 12px;
	cursor: pointer;
	transition: all.3s ease;
	&:hover {
		background: var(--gray-100);
	}
`;

const OutlineButton = styled(Link)`
	padding: 6px 16px;
	border: 1px solid var(--gray-300);
	background: var(--white);
	border-radius: 6px;
	cursor: pointer;
	transition: all.3s ease;
	font-size: 1.6rem;
	line-height: 2.6rem;
	&:hover {
		background: var(--gray-100);
	}
	@media (max-width: 640px) {
		font-size: 1.4rem;
	}
`;

export default function OutlineButton ({
	className,
	haveImg,
	imgSrc,
	children,
	to,
	...props
}) {
	if (to) {
		return (
			<OutlineButton to={to} className={className}>
				{haveImg && <img src={imgSrc} alt={children} />}
				{children}
			</OutlineButton>
		);
	}
	return (
		<Button className={className} {...props}>
			{haveImg && <img src={imgSrc} alt={children} />}
			{children}
		</Button>
	);
}