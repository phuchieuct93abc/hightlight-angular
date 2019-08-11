import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-theme-chooser',
    templateUrl: './theme-chooser.component.html',
    styleUrls: ['./theme-chooser.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ThemeChooserComponent implements OnInit {

    themes: string[];
    @Input()
    selectedTheme: string;
    @Output()
    selectedThemeChange = new EventEmitter<string>();
    visible: boolean;

    constructor() {
    }

    ngOnInit() {
        this.themes = ["default", 'darcula', 'github', 'codepen', 'googlecode','xcode'];

    }

    onSelectTheme(theme: string) {
        this.selectedTheme = theme;
        this.selectedThemeChange.emit(this.selectedTheme);
        this.visible = false;
    }
}
