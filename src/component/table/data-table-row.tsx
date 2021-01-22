// import clsx from 'clsx';
// import React, {FC, ReactNode} from 'react';
// import {CommonComponentProps} from '../common-component';
// import {DataTableColumnConfig} from './data-table';
// import {DataTableCell} from './data-table-cell';
// import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
//
// const useStyles = makeStyles((theme: Theme) => createStyles({
//   root: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: 'fit-content'
//   },
//   stretch: {
//     width: 'auto'
//   },
//   cell: {
//     borderBottom: `1px solid ${theme.palette.divider}`
//   }
// }));
//
// export interface DataTableRowProps extends CommonComponentProps {
//   stretch: boolean;
//   spacer: number;
//   data: ReactNode[];
// }
//
// export const DataTableRow: FC<DataTableRowProps> = props => {
//   const {className, stretch, spacer, data} = props;
//   const classes = useStyles();
//
//   return (
//     <div className={clsx(classes.root, stretch && classes.stretch, className)}>
//       {data.map((n, i) => (
//         <DataTableCell key={i} className={classes.cell} width={c.width} flex={c.flex} title={c.description} align={c.align}>
//           {n}
//         </DataTableCell>
//       ))}
//       {spacer > 0 && (<DataTableCell className={classes.cell} width={spacer}/>)}
//     </div>
//   );
// };