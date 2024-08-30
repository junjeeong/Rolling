import { EmojiTopBadge } from '../Emoji/EmojiTopBadge';
import { Card } from './CardStyled';
import Overlay from './Overlay';
import styled from 'styled-components';

const Container = styled.div`
	position: relative;
	display: flex;
	flex: 1 0;
	padding-bottom: 30px;
	flex-direction: column;
	gap: 12px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.12);
	z-index: 4;

	@media (max-width: 768px) {
		padding-bottom: 25px;
	}
`;

const RecipientName = styled.div`
	font-weight: var(--font-bold);
	font-size: 24px;
	line-height: 36px;
	letter-spacing: -0.01em;
	color: ${({ $hasBackgroundImage }) =>
		$hasBackgroundImage ? 'var(--white)' : 'var(--gray-900)'};
	flex: none;
	align-self: stretch;
	flex-grow: 0;

	@media (max-width: 768px) {
		font-size: 18px;
		line-height: 28px;
	}
`;

const MessageCount = styled.div`
	font-style: normal;
	font-weight: var(--font-regular);
	font-size: 16px;
	line-height: 26px;
	letter-spacing: -0.01em;
	color: ${({ $hasBackgroundImage }) =>
		$hasBackgroundImage ? 'var(--gray-200)' : 'var(--gray-700)'};
	flex: none;
	flex-grow: 0;

	@media (max-width: 768px) {
		font-size: 14px;
		line-height: 20px;
		letter-spacing: -0.005em;
	}
	
	span {
		font-size: 16px;
		font-weight: var(--font-bold);
		line-height: 26px;
		letter-spacing: -0.01em;
		text-align: left;

		@media (max-width: 768px) {
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -0.005em;
		}
	}
`;

const ProfileImagesWrap = styled.div`
	display: flex;
	height: 28px;
	div {
		width: 28px;
		height: 28px;
		border-radius: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0px -6px;

		&:first-child {
			margin-left: 0;
		}

		img {
			width: 28px;
			height: 28px;
			border-radius: 50%;
			border: solid 2px var(--white);
		}
	}
`;

const ExtraProfiles = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 5px 6px;
	background: var(--white);
	border-radius: 30px;
	flex: none;
	order: 3;
	flex-grow: 0;

	font-weight: var(--font-regular);
	font-size: 12px;
	letter-spacing: -0.005em;
	color: var(--gray-500);
`;

const ReactionWrap = styled.ul`
	position: relative;
	display: flex;
	margin-top: 20px;
	gap: 10px;
	z-index: 10;

	@media (max-width: 768px) {
		gap: 4px;
	}
`;

const MainEmoji = styled(EmojiTopBadge)`
	flex: 0 0;

	@media (max-width: 768px) {
		gap: 6px;
		padding: 6px 8px;
	}
`;

const CardContent = ({
	id,
	recipientName,
	messageCount,
	backgroundImageURL,
	backgroundColor,
	profileImage = [],
	topReaction = [],
	handleCardClick,
}) => {

	return (
		<Card
			onClick={handleCardClick}
			backgroundColor={backgroundColor}
			backgroundImageURL={backgroundImageURL}
		>
			{backgroundImageURL && <Overlay />}

			<Container>
				<RecipientName $hasBackgroundImage={!!backgroundImageURL}>
					To. {recipientName}
				</RecipientName>
        <ProfileImagesWrap>
          {profileImage.map((profile, index) => (
            <div key={index}>
              <img src={profile.profileImageURL} alt='Profile' />
            </div>
          ))}
          {messageCount > 3 && (
            <ExtraProfiles>+{messageCount - 3}</ExtraProfiles>
          )}
        </ProfileImagesWrap>
				<MessageCount $hasBackgroundImage={!!backgroundImageURL}>
					<span>{messageCount}</span>명이 작성했어요!
				</MessageCount>
			</Container>
			<ReactionWrap>
				{topReaction.map((list) => (
					<MainEmoji
					key={list.id}
					emojiCode={list.emoji}
					emojiCount={list.count}
					/>
				))}
			</ReactionWrap>
		</Card>
	)
}

export default CardContent;