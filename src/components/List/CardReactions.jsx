import React from 'react';
import styled from 'styled-components';
import { EmojiTopBadge } from '../Emoji/EmojiTopBadge';

const ReactionsContainer = styled.div`
	display: flex;
	width: fit-content;
	gap: 8px;
	margin-top: 16px;
	position: relative;
	z-index: 3;

	@media (max-width: 768px) {
		gap: 4px;
	}
`;

const CustomEmojiSelector = styled(EmojiTopBadge)`
	justify-content: center;
	gap: 4px;

	@media (max-width: 768px) {
		gap: 6px;
		padding: 6px 8px;
	}
`;

const CardReactions = ({ reactions }) => {
	return (
		<>
			<Line />
			<ReactionsContainer>
				{reactions &&
					reactions.map((reaction) => (
						<CustomEmojiSelector
							key={reaction.emoji}
							emojiCode={reaction.emoji}
							emojiCount={reaction.count}
						/>
					))}
			</ReactionsContainer>
		</>
	);
};