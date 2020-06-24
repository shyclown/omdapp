export interface Item {
    id: number;
    elements: Item[];
    item: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    parent_folder_id: number;
    status: number | string;
    entity: Entity;
    entity_id: number;
    entity_type: string;
    pivot?: {
        element_id: number,
        item_id: number,
        order: number,
    }
    tags: any[];
}

export interface ArticleEntity extends Entity{
    text: string;
    description: string;
}
export interface GalleryEntity extends Entity{
    description: string;
}

export interface Entity {
    id: number;
    name: string;
    title: string;
}


export default interface NavigationItem extends Item {
    entity_type: 'navigation';
    entity: NavigationEntity;
    elements: LinkItem[];
}

export interface NavigationEntity extends Entity {

}

export interface LinkItem extends Item {
    entity_type: 'link';
    elements: PageItem[];
    entity: LinkEntity;
}

export interface LinkEntity extends Entity {

    url?: string;
}
export interface PageItem extends Item{
    entity_type: 'page';
    entity: PageEntity;
}
export interface PageEntity extends Entity{
    description: string;
}
