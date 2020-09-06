import React from 'react';

const TimeSelector = ({selectTime}) =>{
	return(
		<div>
			<select onChange={selectTime}>
				<option value = "" hidden> 选择你的到达时间 </option>
				<option type="number" value="0" name="0"> 0:00 </option>
				<option type="number" value="1" name="1"> 1:00 </option>
				<option type="number" value="2" name="2"> 2:00 </option>
				<option type="number" value="3" name="3"> 3:00 </option>
				<option type="number" value="4" name="4"> 4:00 </option>
				<option type="number" value="5" name="5"> 5:00 </option>
				<option type="number" value="6" name="6"> 6:00 </option>
				<option type="number" value="7" name="7"> 7:00 </option>
				<option type="number" value="8" name="8"> 8:00 </option>
				<option type="number" value="9" name="9"> 9:00 </option>
				<option type="number" value="10" name="10"> 10:00 </option>
				<option type="number" value="11" name="11"> 11:00 </option>
				<option type="number" value="12" name="12"> 12:00 </option>
				<option type="number" value="13" name="13"> 13:00 </option>
				<option type="number" value="14" name="14"> 14:00 </option>
				<option type="number" value="15" name="15"> 15:00 </option>
				<option type="number" value="16" name="16"> 16:00 </option>
				<option type="number" value="17" name="17"> 17:00 </option>
				<option type="number" value="18" name="18"> 18:00 </option>
				<option type="number" value="19" name="19"> 19:00 </option>
				<option type="number" value="20" name="20"> 20:00 </option>
				<option type="number" value="21" name="21"> 21:00 </option>
				<option type="number" value="22" name="22"> 22:00 </option>
				<option type="number" value="23" name="23"> 23:00 </option>
			</select>
		</div>
		);

}

export default TimeSelector;