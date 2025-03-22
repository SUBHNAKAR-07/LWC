import { LightningElement, wire, track } from 'lwc';
import getPublishedArticles from '@salesforce/apex/KnowledgeArticleController.getPublishedArticles';
 
export default class KnowledgeArticleTiles extends LightningElement {
    @track articles = [];
    @track buttonLabels = {}; // Object to store button labels dynamically
 
    @wire(getPublishedArticles)
    wiredArticles({ error, data }) {
        if (data) {
            this.articles = data.map(article => ({
                ...article,
                buttonLabel: "View Answer" // Default label
            }));
        } else if (error) {
            console.error('Error fetching articles:', error);
        }
    }
 
    get computedArticles() {
        return this.articles.map(article => ({
            ...article,
            buttonLabel: this.buttonLabels[article.Id] || "View Answer" // Get the correct button label
        }));
    }
 
    toggleAnswer(event) {
        const articleId = event.currentTarget.dataset.id;
        const answerElement = this.template.querySelector(`div[data-id="${articleId}"]`);
 
        if (answerElement) {
            answerElement.classList.toggle("hidden");
 
            // Toggle button label dynamically
            this.buttonLabels = {
                ...this.buttonLabels,
                [articleId]: answerElement.classList.contains("hidden") ? "View Answer" : "Close Answer"
            };
 
            // Force component re-render by updating the tracked articles array
            this.articles = [...this.articles];
        }
    }
}
 
