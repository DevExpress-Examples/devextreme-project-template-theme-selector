<template>
  <div>
    <h2 class="content-block">Tasks</h2>

    <DxDataGrid
      class="dx-card wide-card"
      :data-source="tasks"
      :key-expr="'Task_ID'"
      :focused-row-index="0"
      :show-borders="false"
      :focused-row-enabled="true"
      :column-auto-width="true"
      :column-hiding-enabled="true"
    >
      <DxPaging :page-size="10"/>
      <DxPager
        :show-page-size-selector="true"
        :show-info="true"
      />
      <DxFilterRow :visible="true"/>

      <DxColumn
        data-field="Task_ID"
        :width="90"
        :hiding-priority="2"
      />

      <DxColumn
        data-field="Task_Subject"
        caption="Subject"
        :width="190"
        :hiding-priority="8"
      />

      <DxColumn
        data-field="Task_Status"
        caption="Status"
        :hiding-priority="6"
      />

      <DxColumn
        data-field="Task_Priority"
        caption="Priority"
        :hiding-priority="5"
      >
        <DxLookup
          display-expr="name"
          value-expr="value"
          :data-source="priorities"
        />
      </DxColumn>

      <DxColumn
        data-field="ResponsibleEmployee.Employee_Full_Name"
        caption="Assigned To"
        :allow-sorting="false"
        :hiding-priority="7"
      />

      <DxColumn
        data-field="Task_Start_Date"
        caption="Start Date"
        data-type="date"
        :hiding-priority="3"
      />

      <DxColumn
        data-field="Task_Due_Date"
        caption="Due Date"
        data-type="date"
        :hiding-priority="4"
      />

      <DxColumn
        data-field="Task_Priority"
        caption="Priority"
        name="Priority"
        :hiding-priority="1"
      />

      <DxColumn
        data-field="Task_Completion"
        caption="Completion"
        :hiding-priority="0"
      />
    </DxDataGrid>
  </div>
</template>

<script setup lang="ts">
import 'devextreme/data/odata/store';
import DxDataGrid, {
  DxColumn,
  DxFilterRow,
  DxLookup,
  DxPager,
  DxPaging,
} from 'devextreme-vue/data-grid';
import { tasks, priorities } from '@/data/data';
</script>
