import { LightningElement, wire } from 'lwc';
import getTileData from '@salesforce/apex/FranchiseTileController.getTileData';

export default class FranchiseTileMenu extends LightningElement {
    tiles = [];

    @wire(getTileData)
    wiredTiles({ error, data }) {
        if (data) {
            this.tiles = data;
        } else if (error) {
            console.error('Error fetching tile data:', error);
        }
    }

    handleTileClick(event) {
        const url = event.currentTarget.dataset.url;
        if (url) {
            window.open(url, '_blank');
        }
    }
}
