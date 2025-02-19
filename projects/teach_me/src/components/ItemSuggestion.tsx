import { ComponentProps } from 'react';

type ItemSuggestionProperties = ComponentProps<'button'> & {
    title: string,
}

export function ItemSuggestion({title, ...props}: ItemSuggestionProperties) {

    return (
        <button {...props}>{title}</button>
    );
}