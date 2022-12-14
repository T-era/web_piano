import { ScoreModel } from "../../model/score";
import RibonMenu from "../components/Ribon";
import { menuEditInit } from "./MenuEdit";
import { menuMusicInit, refreshMenuMusic } from "./MenuMusic";
import { menuPlayInit } from "./MenuPlay";
import { systemInit } from "./MenuSystem";

export function headerInit(scoreModel :ScoreModel) {
    RibonMenu({
        menuItems: [
            menuItemByIds('menu_item_play', 'menu_content_play', ()=>{}),
            menuItemByIds('menu_item_music', 'menu_content_music', () => refreshMenuMusic(scoreModel.musicSetting)),
            menuItemByIds('menu_item_system', 'menu_content_system', ()=>{}),
            menuItemByIds('menu_item_edit', 'menu_content_edit', ()=>{}),
        ],
        parentDom: document.getElementById('control_panel_grid')!
    });
    menuPlayInit(scoreModel);
    menuMusicInit(scoreModel);
    systemInit(scoreModel);
    menuEditInit(scoreModel);
}

function menuItemByIds(titleId :string, contentId :string, refreshContents :()=>void) {
    return {
        title: document.getElementById(titleId)!,
        contents: document.getElementById(contentId)!,
        refreshContents: refreshContents,
    }
}