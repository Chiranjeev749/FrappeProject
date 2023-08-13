import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-search-panel',
  templateUrl: './input-search-panel.component.html',
  styleUrls: ['./input-search-panel.component.css']
})
export class InputSearchPanelComponent {
  constructor() { }

  ngOnInit(): void {
  }
  @Input() searchList: string[] = [];
  @Output() selectionChanged = new EventEmitter<string>();
  @Output() InputValue = new EventEmitter<string>();

  selectedSuggestion:string = '';
  selectedSuggestionIndex = -1;
  searching = false;

  onInput(value: string) {
    // User implementation in their own component
    if(value.length >2){
      this.searching = true;
    }else{
      this.searchList =[];
    }
    this.InputValue.emit(value);
  }

  onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.selectPreviousSuggestion();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.selectNextSuggestion();
        break;
      case 'Enter':
        event.preventDefault();
        const selectedSuggestion = this.searchList[this.selectedSuggestionIndex];
        if (selectedSuggestion) {
          this.selectSuggestion(selectedSuggestion);
        }
        this.searching = false;
        this.onSelect()
        break;
    }
  }
  
  onSelect(){
    if(!this.searching){
      this.selectedSuggestionIndex = -1;
      // this.selectedSuggestion=null; 
    }
  }

  selectSuggestion(suggestion: string) {
    this.selectedSuggestion = suggestion;
    this.selectedSuggestionIndex = this.searchList.indexOf(suggestion);
    this.selectionChanged.emit(suggestion);
    this.searching = false;
    this.onSelect();
  }

  selectPreviousSuggestion() {
    if (this.selectedSuggestionIndex > 0) {
      this.selectedSuggestionIndex--;
      this.selectedSuggestion = this.searchList[this.selectedSuggestionIndex];
    }
  }

  selectNextSuggestion() {
    if (this.selectedSuggestionIndex < this.searchList.length - 1) {
      this.selectedSuggestionIndex++;
      this.selectedSuggestion = this.searchList[this.selectedSuggestionIndex];
    }
  }

  isSuggestionSelected(suggestion: string): boolean {
    return suggestion === this.selectedSuggestion;
  }

  isSuggestionSelected1(suggestion: string): boolean {
    const index = this.searchList.indexOf(suggestion);
    return index === this.selectedSuggestionIndex;
  }

  onBlur() {
    setTimeout(() => {
      this.searching = false;
    }, 250);
  }

  onClick() {
    // User implementation in their own component
  }
}
