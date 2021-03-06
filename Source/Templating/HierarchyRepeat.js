/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { RepeatStrategyLocator } from 'aurelia-templating-resources';
import { inject, BoundViewFactory, customAttribute, bindable, templateController, TargetInstruction, ViewSlot, ViewResources } from 'aurelia-framework';
import { HierarchyRepeater } from './HierarchyRepeater';
import { TooManyElementsWithHierarchyChildrenProperty } from './TooManyElementsWithHierarchyChildrenProperty';
import { MissingHierarchyChildrenProperty } from './MissingHierarchyChildrenProperty';

const attributeName = 'hierarchy-children-property';

/**
 * Represents the repeater for the top level of a hierarchy
 */
@customAttribute('hierarchy-repeat')
@templateController
@inject(BoundViewFactory, TargetInstruction, ViewSlot, RepeatStrategyLocator)
export class HierarchyRepeat extends HierarchyRepeater {  
    #childrenProperty = null;

    @bindable local;
    @bindable items;

    /**
     * Get the children property to use recursively
     */
    get childrenProperty() {
        return this.#childrenProperty;
    }

    /**
     * Initializes a new instance of {HierarchyRepeat}
     * @param {ViewFactory} viewFactory The view factory for the element
     * @param {TargetInstruction} instruction The target instruction
     * @param {ViewSlot} viewSlot The viewslot to render to
     * @param {RepeatStrategyLocator} strategyLocator A repeat strategy locator
     */
    constructor(viewFactory, instruction, viewSlot, strategyLocator) {
        super(viewFactory, instruction, viewSlot, strategyLocator);

        let childrenPropertyElements = viewFactory.viewFactory.template.querySelectorAll(`[${attributeName}]`);
        this.#throwIfTooManyElementsWithHierarchyChildrenProperty(childrenPropertyElements);
        this.#throwIfMissingHierarchyChildrenProperty(childrenPropertyElements);

        this.#childrenProperty = childrenPropertyElements[0].getAttribute(attributeName);
    }

    #throwIfMissingHierarchyChildrenProperty(childrenPropertyElements) {
        if (childrenPropertyElements.length == 0) MissingHierarchyChildrenProperty.throw();
    }

    #throwIfTooManyElementsWithHierarchyChildrenProperty(childrenPropertyElements) {
        if (childrenPropertyElements.length > 1) TooManyElementsWithHierarchyChildrenProperty.throw();
    }
}
