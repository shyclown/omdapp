export interface Item {
    item: number;
    tags: any[];
    deleted_at: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    parent_folder_id: number;
    status: number | string;
    entity: Entity | EntityWithElements;
    entity_id: number;
    entity_type: string;
    pivot?: {
        element_id: number,
        item_id: number,
        order: number,
    }
}

export interface Entity {
    id: number;
    name: string;
    title: string;
}

export interface EntityWithElements extends Entity{
    elements: any[];
}

export default interface NavigationItem extends Item{
    entity_type: 'navigation';
    elements: LinkItem[];
    entity: NavigationEntity;
}
export interface NavigationEntity extends EntityWithElements{
    elements: LinkItem[];
}
export interface LinkItem extends Item{
    entity_type: 'link';
    elements: PageItem[];
    entity: LinkEntity;
}
export interface LinkEntity extends EntityWithElements{

    url?: string;
}
export interface PageItem extends Item{
    entity_type: 'page';
    entity: PageEntity;
}
export interface PageEntity extends Entity{
    description: string;
}
