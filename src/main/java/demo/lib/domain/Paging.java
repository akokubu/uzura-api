package demo.lib.domain;

import java.util.Optional;

import org.seasar.doma.jdbc.SelectOptions;

public class Paging {

	private static final int DEFAULT_PAGE_NUMBER = 1;
	private static final int DEFAULT_RECORD_COUNT = 20;

	/** 表示したいページ番号 */
	private Optional<Integer> pageNumber = Optional.empty();

	/** 1ページ当たりのレコード数 */
	private Optional<Integer> numberOfRecord = Optional.empty();

	public Paging(Integer pageNumber, Integer numberOfRecord) {
		this.pageNumber = Optional.ofNullable(pageNumber);
		this.numberOfRecord = Optional.ofNullable(numberOfRecord);
	}

	public int getPageNumber() {
		return pageNumber.orElse(DEFAULT_PAGE_NUMBER);
	}

	public int getNumberOfRecord() {
		return numberOfRecord.orElse(DEFAULT_RECORD_COUNT);
	}

	public SelectOptions getSelectOption() {
		return SelectOptions.get()
				.offset(getOffset())
				.limit(getNumberOfRecord())
				.count();
	}

	private int getOffset() {
		return (getPageNumber() - 1) * getNumberOfRecord();
	}
}
