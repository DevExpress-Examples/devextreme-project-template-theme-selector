import React from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
} from 'devextreme-react/data-grid';
import { tasks, priorities } from '../../data/data';

export default function Task(): JSX.Element {
  return (
    <React.Fragment>
      <h2 className='content-block'>Tasks</h2>

      <DataGrid
        className='dx-card wide-card'
        dataSource={tasks}
        keyExpr='Task_ID'
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />

        <Column dataField='Task_ID' width={90} hidingPriority={2} />
        <Column
          dataField='Task_Subject'
          width={190}
          caption='Subject'
          hidingPriority={8}
        />
        <Column
          dataField='Task_Status'
          caption='Status'
          hidingPriority={6}
        />
        <Column
          dataField='Task_Priority'
          caption='Priority'
          hidingPriority={5}
        >
          <Lookup
            dataSource={priorities}
            valueExpr='value'
            displayExpr='name'
          />
        </Column>
        <Column
          dataField='ResponsibleEmployee.Employee_Full_Name'
          caption='Assigned To'
          allowSorting={false}
          hidingPriority={7}
        />
        <Column
          dataField='Task_Start_Date'
          caption='Start Date'
          dataType='date'
          hidingPriority={3}
        />
        <Column
          dataField='Task_Due_Date'
          caption='Due Date'
          dataType='date'
          hidingPriority={4}
        />
      </DataGrid>
    </React.Fragment>
  );
}
